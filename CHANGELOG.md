# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [6.0.0](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.10.0...@lunit/insight-viewer@6.0.0) (2022-10-27)

### Features

- **docs:** add scale 0.5 comment to setting initial viewport switch ([ccc1a44](https://github.com/lunit-io/frontend-components/commit/ccc1a44e2e8a50f20545fa8014b4c8d05e0a23f2))
- **docs:** add usage for handling cursor style ([4ff9519](https://github.com/lunit-io/frontend-components/commit/4ff95192fec5d7be6149e5872f23127e440dd9f2))
- **docs:** apply fit scale option false for default scale 0.5 in docs ([024366b](https://github.com/lunit-io/frontend-components/commit/024366bc05d58dd3548355fc796ac1de64274b6d))
- **docs:** apply initial scale 1 to interaction docs ([ff3d7b6](https://github.com/lunit-io/frontend-components/commit/ff3d7b6762ee51fbae7caa56ac11b44e2f2f00a9))
- **docs:** apply modified useViewport parameter type to docs ([fe0ad2b](https://github.com/lunit-io/frontend-components/commit/fe0ad2b24924f508056bbb96b94afe56b5eac3f9))
- **docs:** apply toggle button of initial viewport ([eeb9dc5](https://github.com/lunit-io/frontend-components/commit/eeb9dc5f29fd42c2a3e392f16523345705e76c7c))
- **viewer:** add className to handle cursor style ([4f13040](https://github.com/lunit-io/frontend-components/commit/4f1304094771c425ba1aabd44606fd43eb493ff9))
- **viewer:** add default viewport option constant ([c9c753c](https://github.com/lunit-io/frontend-components/commit/c9c753c89628226db6a61593fa3178e27e06057b))
- **viewer:** add measurement prop, modify getting current id logic ([5e48956](https://github.com/lunit-io/frontend-components/commit/5e4895618f58761e8e0d9fdea0cf8e534409173f))
- **viewer:** add modifyConnectingLine ([8eebd64](https://github.com/lunit-io/frontend-components/commit/8eebd644b420ea3280ebe93af1c37be04788abb6))
- **viewer:** add options param to useViewport hook ([c95ece4](https://github.com/lunit-io/frontend-components/commit/c95ece45a577be30aa22802253b453511c55cf85))
- **viewer:** add selectedAnnotation prop to Viewer ([889f49f](https://github.com/lunit-io/frontend-components/commit/889f49f97b1ef60025aef2004b3ee6dfbd929c0c))
- **viewer:** add selectedMeasurement prop to Viewer ([e70687f](https://github.com/lunit-io/frontend-components/commit/e70687f03042f5404e265925f92a761c18be3e4a))
- **viewer:** add useTextBox hook ([5908fe1](https://github.com/lunit-io/frontend-components/commit/5908fe13e96f5d4a02da80f1059f7c1638ea19f5))
- **viewer:** apply \_resetViewport default value when viewport reset ([d17627d](https://github.com/lunit-io/frontend-components/commit/d17627dc151641012b381233ef0931bb6a20d744))
- **viewer:** apply combined onClick prop and onFocus null logic ([a07ef2b](https://github.com/lunit-io/frontend-components/commit/a07ef2b7d90b258d0131f8d28d1c3a38941110f6))
- **viewer:** apply default viewport option value when initial setting ([25ea04c](https://github.com/lunit-io/frontend-components/commit/25ea04c43f448c6b7868a44e765e49accce73a14))
- **viewer:** apply formatViewport viewportOptions field ([868828a](https://github.com/lunit-io/frontend-components/commit/868828ac688938b5ff03a4751fb7a64321f8b24f))
- **viewer:** apply onFocus when onClick event running ([c4183b5](https://github.com/lunit-io/frontend-components/commit/c4183b5325666f01e66b0ceb7aabf8a47725c2ac))
- **viewer:** apply x,y unchanged logic by viewport scale limit ([03ea63c](https://github.com/lunit-io/frontend-components/commit/03ea63cecbc3fb6cf1f56ad3eb88774b7d8eba08))
- **viewer:** combine onSelect, onRemove prop in Viewer ([e7dda50](https://github.com/lunit-io/frontend-components/commit/e7dda506ee19a79b8b9b9dcbf8c439e0430dbcc3))
- **viewer:** delete initialize measurement when measurement removed ([b5d4a61](https://github.com/lunit-io/frontend-components/commit/b5d4a61de006324e59830abc7264b79faacd560f))
- **viewer:** export BasicViewport, ViewportOptions type ([0e83be3](https://github.com/lunit-io/frontend-components/commit/0e83be3a1c30321b121c279c222d3c5420971005))
- **viewer:** if it's not an extended area, delete onMouseDown event ([7e32297](https://github.com/lunit-io/frontend-components/commit/7e322971a7fea4c13d22b352cd430ad89879794a))
- **viewer:** initialize cursor style ([48b63fd](https://github.com/lunit-io/frontend-components/commit/48b63fd957a0af9acdefa2b2f5f03e679a51ef6f))
- **viewer:** modify connecting line in Circle viewer and drawer ([ac181c2](https://github.com/lunit-io/frontend-components/commit/ac181c2915cef624528d162d18fc59f1267e481f))
- **viewer:** modify connecting line in Ruler viewer and drawer ([5dabbdb](https://github.com/lunit-io/frontend-components/commit/5dabbdbd534842ff5f5932b9b37df0539daa19ae))
- **viewer:** modify edit pointer width ([8727d66](https://github.com/lunit-io/frontend-components/commit/8727d66ee7ea6ae7fc93f3529e8897b477999d31))
- **viewer:** optimize calcDistance function and change name ([d22b510](https://github.com/lunit-io/frontend-components/commit/d22b5109d696e6a975dc17003ad5b476a5341499))
- **viewer:** remove duplicated class name ([6d27d4d](https://github.com/lunit-io/frontend-components/commit/6d27d4dd907f0c66b64e8e7d7233529f5efe01be))
- **viewer:** remove reset hovered annotation when remove annotation ([b51e027](https://github.com/lunit-io/frontend-components/commit/b51e0271a236777880558b90fa7421c829b61190))
- **viewer:** remove selected annotation deletion, override annotation ([3a75e5c](https://github.com/lunit-io/frontend-components/commit/3a75e5c839b14d4909c5024899b9aedd36084190))
- **viewer:** remove selected annotation deletion, override measurement ([bd1a959](https://github.com/lunit-io/frontend-components/commit/bd1a9595ad7192b5f8d586fbdb3323f64a143703))
- **viewer:** set viewport fit scale when fit scale option is true ([3236e74](https://github.com/lunit-io/frontend-components/commit/3236e74a2c87dd478460292231541cc7672b42c4))

### Bug Fixes

- **viewer:** can find close point on Ruler Mode ([be78ed1](https://github.com/lunit-io/frontend-components/commit/be78ed1f138106be479bee244a26aa4bc8c872f8))
- **viewer:** give hidden property when TextBox Ref is null ([9557527](https://github.com/lunit-io/frontend-components/commit/9557527e3a633e8b5c29ee2b066295cefe92ac3b))
- **viewer:** measurement ruler error ([768bda6](https://github.com/lunit-io/frontend-components/commit/768bda652b11bb471506937c171ad0f9c0f92d63))
- **viewer:** modify finding connectingLine logic ([3757171](https://github.com/lunit-io/frontend-components/commit/3757171bc4a9a5150e5ffc6d0f42484fa26d38cb))
- **viewer:** modify typo annotaion to annotation ([9f35cd1](https://github.com/lunit-io/frontend-components/commit/9f35cd1030c2d35e1c4f50bfb7efbe693eeaf8da))
- **viewer:** mouseEvent error after dragging in Measurement Mode ([e44ff2a](https://github.com/lunit-io/frontend-components/commit/e44ff2a1b0f69bd8d260accbdde57e100ff5cde4))
- **viewer:** prevent dragging when hovered in Annotation Mode ([47ebfe2](https://github.com/lunit-io/frontend-components/commit/47ebfe258159c1e30bd5007ba0ae9f03021856be))
- **viewer:** prevent dragging when hovered in Measurement Mode ([739c1d3](https://github.com/lunit-io/frontend-components/commit/739c1d310befd8cfc31d5bd4cef6b2941b48e3d9))

## [5.10.0](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.9.2...@lunit/insight-viewer@5.10.0) (2022-10-19)

### Features

- **viewer:** add className ([d0f28f3](https://github.com/lunit-io/frontend-components/commit/d0f28f36074ee9cf557c22ca72cca5d08ee499b4))
- **viewer:** modify className ([c7e2262](https://github.com/lunit-io/frontend-components/commit/c7e226235678d9454b597b55ad0e31b3a38250e6))
- **viewer:** modify EditPointer classname ([a3517ea](https://github.com/lunit-io/frontend-components/commit/a3517ea783fe86fa82d89012e77932f4909db962))

### Bug Fixes

- **viewer:** conflict error ([eb0d0d9](https://github.com/lunit-io/frontend-components/commit/eb0d0d9ff880fc06953b8b0bbb00db6589584d91))

## [5.9.2](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.9.1...@lunit/insight-viewer@5.9.2) (2022-09-27)

### Features

- **viewer:** modify text point logic for editing text move mode ([29211db](https://github.com/lunit-io/frontend-components/commit/29211db1ebeb805da5d4092d82118b5f215848a1))

## [5.9.1](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.9.0...@lunit/insight-viewer@5.9.1) (2022-09-21)

### Features

- **viewer:** modify useImage Props type ([0a253e7](https://github.com/lunit-io/frontend-components/commit/0a253e74388d1ebeeb70eb27d3577eba261a4496))

## [5.9.0](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.8.3...@lunit/insight-viewer@5.9.0) (2022-09-21)

### Features

- add circle center calculation ([aa47736](https://github.com/lunit-io/frontend-components/commit/aa477360946fe7017b323f26001fdcc23465e6ca))
- add getCircleRadiusByCenter logic ([5c8d6b3](https://github.com/lunit-io/frontend-components/commit/5c8d6b3b81bac86aae68d082742935eabf3af7f1))
- change centerPoint generate logic ([90adf0f](https://github.com/lunit-io/frontend-components/commit/90adf0fdc851ba24faea86cbda380484d8f7ade0))
- change drawingRadius function of circle ([1c269d3](https://github.com/lunit-io/frontend-components/commit/1c269d32fcc6d9c029fe27ae605cfef81fbd3a30))
- change edit mode handling logic of circle ([4db1ca4](https://github.com/lunit-io/frontend-components/commit/4db1ca4d014eeef1c256d8670d98fef2b14c6f56))
- change points handling logic of circle ([d0107c8](https://github.com/lunit-io/frontend-components/commit/d0107c8f2f19af61c4a0d48468896edd279c01e2))
- **docs:** add image selector on annotation and measurement ([b2cb1f0](https://github.com/lunit-io/frontend-components/commit/b2cb1f0295ca1811e403c49b7d4a56b5bde80a81))
- **docs:** add usage for new useImage in Basic page ([ac2fb6e](https://github.com/lunit-io/frontend-components/commit/ac2fb6ed970175586a7a390f44d9dc2fa3e0783d))
- **viewer:** add getCircleStartPoint function ([8bbf73b](https://github.com/lunit-io/frontend-components/commit/8bbf73bb4a3e276d969b1e760559cb2122c92e9a))
- **viewer:** add validation util functions of points ([8477751](https://github.com/lunit-io/frontend-components/commit/847775162adf6b7b585b6d2d9850b00e7cd4e4f1))
- **viewer:** apply validation of same points when drawing ([3d9592f](https://github.com/lunit-io/frontend-components/commit/3d9592febb1b767b3d929d92dbbb6382fe03048d))
- **viewer:** change ruler text position ([17f6387](https://github.com/lunit-io/frontend-components/commit/17f6387e48fb8301e7cbc7574e34468bea3830ab))
- **viewer:** modify getRulerTextPosition ([62ca329](https://github.com/lunit-io/frontend-components/commit/62ca329e4ca788908f577aa59265c2028b30170b))
- **viewer:** modify validation logic to Annotation, Measurement ([51e2c79](https://github.com/lunit-io/frontend-components/commit/51e2c79777b67736a07ca69b6b2f463559bfd43d))
- **viewer:** modify zoom feature ([71091e0](https://github.com/lunit-io/frontend-components/commit/71091e0cde2cb8a3a8e63efccb634995d531b7f7))
- **viewer:** parameterize useImage's HTTP client ([65fc366](https://github.com/lunit-io/frontend-components/commit/65fc36624a1aa93e64b34cbe4b314e269f941ab2))

### Bug Fixes

- **docs:** remove not exist type export ([ee4667a](https://github.com/lunit-io/frontend-components/commit/ee4667a9418437c3db90ae1978be1955f070cf73))
- **viewer:** add drawingMode to getEditPointPosition ([5b51d8c](https://github.com/lunit-io/frontend-components/commit/5b51d8c9ffd1182190ad9a6d372455ca8e1a8aa3))
- **viewer:** add isStartedFromCenter to calculateRadius ([8189d04](https://github.com/lunit-io/frontend-components/commit/8189d04a53f4caf42de8f62377a4a80be0e73b84))
- **viewer:** change wrong constant name ([760be30](https://github.com/lunit-io/frontend-components/commit/760be306b997e76cd6770a219b75d38281eba1e1))
- **viewer:** modify conditional statement ([4eb9e07](https://github.com/lunit-io/frontend-components/commit/4eb9e0740f903a21923fd97243bc908711ac43e8))
- **viewer:** scale logic ([760857d](https://github.com/lunit-io/frontend-components/commit/760857dfb85e9205871fa3ea6f3475c27d64b535))
- **viewer:** text default position ([3dd8ecb](https://github.com/lunit-io/frontend-components/commit/3dd8ecbcbc6f0dac2389416f665b6e9aed85a62f))

## [5.8.3](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.8.2...@lunit/insight-viewer@5.8.3) (2022-09-16)

### Features

- **docs:** add label mode switch button to Annotation Drawer docs ([fd4414c](https://github.com/lunit-io/frontend-components/commit/fd4414ce0e1d05c2a4a9ac9e8a1d65d7ebd18a20))
- **viewer:** add showAnnotationLabel prop to Annotation Drawer ([d90bb32](https://github.com/lunit-io/frontend-components/commit/d90bb3285a2f85ff5564dcf4df3bc353ecd5829d))

## [5.8.2](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.8.1...@lunit/insight-viewer@5.8.2) (2022-09-15)

### Features

- **viewer:** delete pointerEvents to svg root style and apply to Viewer ([2124d07](https://github.com/lunit-io/frontend-components/commit/2124d0743a17025a06d464f824893b4c85499a58))

## [5.8.1](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.8.0...@lunit/insight-viewer@5.8.1) (2022-09-15)

### Features

- **viewer:** add pointer event none style to svg root ([7ea0b3e](https://github.com/lunit-io/frontend-components/commit/7ea0b3e365157597c6f364d31f64ccb1c4744eb7))

## [5.8.0](https://github.com/lunit-io/frontend-components/compare/@lunit/insight-viewer@5.7.0...@lunit/insight-viewer@5.8.0) (2022-09-13)

### Features

- add Viewer common style ([3e8ba9b](https://github.com/lunit-io/frontend-components/commit/3e8ba9bb466bf777c7174893cea8c6635f8a0a7a))
- apply extended area to EditPointer ([2352634](https://github.com/lunit-io/frontend-components/commit/23526345b73a03236fa6589e586766adad82d06a))
- apply extendedAnnotation to Viewer, Drawer ([e8a5133](https://github.com/lunit-io/frontend-components/commit/e8a5133e994eab6910b621fa3d63157da0c9d5b6))
- apply extendedMeasurement to Viewer, Drawer ([35f54a3](https://github.com/lunit-io/frontend-components/commit/35f54a370dac1c9f455354fde2459e9189891842))
- modify extended area stroke width 20px to 12px ([36f711c](https://github.com/lunit-io/frontend-components/commit/36f711cfee9eb29b3a74f3ac61163cc8c0e87911))
- **viewer-docs:** change logo ([968b600](https://github.com/lunit-io/frontend-components/commit/968b6006c017b8bb8bf677068316f96b1ee6968f))
- **viewer:** add checkIsInitialAnnotation util function and unit test ([5c9cf79](https://github.com/lunit-io/frontend-components/commit/5c9cf7968085360c633bef14d311ec757644c54d))
- **viewer:** add getAnnotationPoints util function and unit test code ([cda1358](https://github.com/lunit-io/frontend-components/commit/cda1358b0e8428959d1326dcdfe5ad6dd2cd6687))
- **viewer:** add getDrawingAnnotation util function and unit test code ([8b8be2d](https://github.com/lunit-io/frontend-components/commit/8b8be2dde5e45fd155c44bea802622a35afc5988))
- **viewer:** add getExistingAnnotationPoints util function, test code ([041fd5d](https://github.com/lunit-io/frontend-components/commit/041fd5d616edc3529441c4c1dfd9c7b29ca1546a))
- **viewer:** add getInitialAnnotation util function and unit test code ([750235c](https://github.com/lunit-io/frontend-components/commit/750235c9dc4cf6f480818da6d7065532595fdb12))
- **viewer:** apply label position update logic to getDrawingAnnotation ([c938e13](https://github.com/lunit-io/frontend-components/commit/c938e13bcc1ec5cc4165f6e3df97798daa6d4bdd))
- **viewer:** delete label prop to TextDrawer ([336e41b](https://github.com/lunit-io/frontend-components/commit/336e41b1305b1262e5927207c231bdfbb6347ed9))
- **viewer:** delete unused getDrewAnnotation util function ([4f73f3a](https://github.com/lunit-io/frontend-components/commit/4f73f3af23a6983dae46f6e920be47bce4f1ebcc))
- **viewer:** modify return value points to annotation, apply to Drawer ([0a025da](https://github.com/lunit-io/frontend-components/commit/0a025dae85747cd05c9f96dd416ed03e9cc03c6b))

### Bug Fixes

- fix getDrawer e2e test ([7023257](https://github.com/lunit-io/frontend-components/commit/7023257e9e430e8d74b58cf28c522f0107875752))
- **viewer:** drawer error ([ad5360f](https://github.com/lunit-io/frontend-components/commit/ad5360f4dbe9dc813bf6bbbcfabd2beebac9129a))
- **viewer:** error in calculateDistance ([ca294b6](https://github.com/lunit-io/frontend-components/commit/ca294b67176529e914cf0c5324172a409a353658))
- **viewer:** fix getMeasurement test ([2c6f316](https://github.com/lunit-io/frontend-components/commit/2c6f31687dcc7363266a8616266d5cfc1f71172b))
- **viewer:** use jsx: react for backward compatibility ([32774f9](https://github.com/lunit-io/frontend-components/commit/32774f994a4b737bb69a3c6cecf3f408dfb928f6))
