### DicomViewer

본 문서는 DicomViewer 컴포넌트의 동작 방식 및 구현 방법을 설명합니다.
DicomViewer 와 내부, 외부 동작 방식을 정의하여 최종 구현 방법을 설명합니다.
해당 컴포넌트의 동작 매커니즘을 정의 및 설명합니다.

#### 목표

1. DICOM 영상 이미지를 보여줄 수 있어야한다.
2. API 를 사용할 때, 코드는 최소한으로 작성할 수 있어야한다.
3. 유저가 선택한 데이터 핸들링 주체(내, 외부)와 관계없이 동일한 동작을 보장할 수 있어야한다.
4. Viewer Component 는 value, onChange 를 통해 Controlled Component 로 사용할 수 있어야한다.

#### 동작 방식

- DicomViewer 에 value 가 변경됨
- 변경된 value 를 cornerstone 에 전달 및 적용
- cornerstone 에 의해 영상 이미지가 변경됨
- 변경된 영상 이미지에 대한 viewport 정보를 onChange 를 호출하여 전달 (react 렌더링)
- cornerstone Class 의 value 와 react 의 value 가 동일하면 업데이트를 하지 않음

#### 구현 방법

1. custom hook 형태로 DICOM 영상 이미지 데이터를 가져올 수 있다. (useDicomViewer)
2. 1의 과정을 통해 가져온 데이터를 컴포넌트에 주입하여 영상 이미지를 보여줄 수 있다. (DicomViewer)
3. 영상 이미지 URL 주소를 컴포넌트에 직접 주입하여 영상 이미지를 보여줄 수 있다. (사용성 개선)

#### Sub 구현 방법

useDicomViewer props type < DicomViewer props type
(DicomViewer props 가 superset 되는 형태)

#### 구현 방법 리뷰

1,3 번의 차이는 custom hook 형태로 데이터를 가져오느냐, 직접 주입하느냐의 차이이다.
1번은 영상 이미지 데이터를 가져와 외부에서 활용하기 쉽다는 점에서 좋습니다.
3번은 외부에서 별다른 핸들링 로직 없이 이미지 URL 만 주입하면 되기 때문에 사용성이 좋습니다.

1번 방법이 외부에서 활용하기 쉽다는 이유는 다음과 같습니다.

- useDicomViewer 의 `onImageChange`, `onViewportChange` 를 통해 외부에서 영상 이미지 데이터를 조작할 수 있습니다.
- image, viewport 동작 제어권을 외부에 넘기기 때문에 외부에서 충분히 핸들링 할 수 있습니다.
