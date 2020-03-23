/* eslint-disable */

export function createSourceProgram(source, compilerOptions = {}) {
  const host = {
    getSourceFile: (fileName, languageVersion, _onError) => {
      return fileName === 'test.ts'
        ? ts.createSourceFile(fileName, source, languageVersion, false, ts.ScriptKind.TSX)
        : undefined;
    },
    getDefaultLibFileName: () => '',
    writeFile: (_fileName, _content) => {
      throw new Error('unsupported');
    },
    getCurrentDirectory: () => __dirname,
    getCanonicalFileName: fileName => fileName,
    getNewLine: () => '\n',
    useCaseSensitiveFileNames: () => false,
    fileExists: fileName => fileName === 'test.ts',
    readFile: fileName => (fileName === 'test.ts' ? source : undefined),
    resolveModuleNames: (_moduleNames, _containingFile) => {
      return _moduleNames.map(moduleName => ({ resolvedFileName: moduleName + '.ts', isExternalLibraryImport: true }));
    },
    getDirectories: _path => {
      throw new Error('unsupported');
    },
  };

  return ts.createProgram(['test.ts'], compilerOptions, host);
}

export function getExportNode(declaration) {
  while (true) {
    if (!declaration.parent || declaration.parent.pos === 0) {
      return declaration;
    }
    declaration = declaration.parent;
  }
}

export function removeBody(declaration) {
  if (ts.isClassLike(declaration)) {
    declaration.members = ts.createNodeArray();
  } else if (ts.isFunctionDeclaration(declaration)) {
    declaration.body.statements = ts.createNodeArray();
  } else if (ts.isVariableDeclaration(declaration)) {
    //@ts-ignore
    if (ts.isFunctionLike(declaration.initializer)) {
      removeBody(declaration.initializer);
    }
  } else if (ts.isArrowFunction(declaration)) {
    if (ts.isArrowFunction(declaration.body)) {
      removeBody(declaration.body);
    } else {
      //@ts-ignore
      declaration.body.statements = ts.createNodeArray();
    }
  }
}

export const api = (...names) => source => {
  const program = createSourceProgram(source);
  const sourceFile = program.getSourceFile('test.ts');

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const typeChecker = program.getTypeChecker();
  const symbol = typeChecker.getSymbolAtLocation(sourceFile);
  const exports = typeChecker.getExportsOfModule(symbol);

  /** @type {Map<string, string>} */
  const result = new Map();

  for (const { escapedName, declarations, valueDeclaration } of exports) {
    const name = escapedName.toString();

    if (names.length > 0 && names.indexOf(name) === -1) continue;

    const declaration = valueDeclaration || declarations[0];

    //const type = typeChecker.getTypeAtLocation(declaration);
    //const typeString = typeChecker.typeToString(type);
    //
    //console.log(escapedName, typeString);

    if (declaration) {
      removeBody(declaration);
      const node = getExportNode(declaration);
      const text = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);

      result.set(name, text);
    }
  }

  return result;
};
