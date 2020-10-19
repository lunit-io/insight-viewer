function asciiDecode(buf: ArrayBufferLike): string {
  const arr: Uint8Array = new Uint8Array(buf);
  //@ts-ignore
  return String.fromCharCode.apply(null, arr);
}

function readUint16LE(buffer: ArrayBufferLike): number {
  let view: DataView = new DataView(buffer);
  let val: number = view.getUint8(0);
  val |= view.getUint8(1) << 8;
  return val;
}

export function npy(
  buf: ArrayBufferLike,
): {
  shape: [number, number, number, number];
  isFortranOrder: boolean;
  data: Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;
} {
  // Check the magic number
  let magic: string = asciiDecode(buf.slice(0, 6));
  if (magic.slice(1, 6) !== 'NUMPY') {
    throw new Error('unknown file type');
  }

  // var version = new Uint8Array(buf.slice(6, 8));
  let headerLength: number = readUint16LE(buf.slice(8, 10));
  let headerStr: string = asciiDecode(buf.slice(10, 10 + headerLength));
  let offsetBytes: number = 10 + headerLength;
  //rest = buf.slice(10+headerLength);  XXX -- This makes a copy!!! https://www.khronos.org/registry/typedarray/specs/latest/#5

  // Hacky conversion of dict literal string to JS Object
  let header: string = headerStr
    .toLowerCase()
    .replace(/\(/g, '[')
    .replace(/\)/g, ']')
    .replace(/'/g, '"')
    .replace(', }', '}');
  let info: {
    descr: string;
    shape: [number, number, number, number];
    fortran_order: boolean;
  } = JSON.parse(header);

  // Intepret the bytes according to the specified dtype
  let data: Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;
  if (info.descr === '|u1') {
    data = new Uint8Array(buf, offsetBytes);
  } else if (info.descr === '|i1') {
    data = new Int8Array(buf, offsetBytes);
  } else if (info.descr === '<u2') {
    data = new Uint16Array(buf, offsetBytes);
  } else if (info.descr === '<i2') {
    data = new Int16Array(buf, offsetBytes);
  } else if (info.descr === '<u4') {
    data = new Uint32Array(buf, offsetBytes);
  } else if (info.descr === '<i4') {
    data = new Int32Array(buf, offsetBytes);
  } else if (info.descr === '<f4') {
    data = new Float32Array(buf, offsetBytes);
  } else if (info.descr === '<f8') {
    data = new Float64Array(buf, offsetBytes);
  } else {
    throw new Error('unknown numeric dtype');
  }

  return {
    shape: info.shape,
    isFortranOrder: info.fortran_order,
    data: data,
  };
}
