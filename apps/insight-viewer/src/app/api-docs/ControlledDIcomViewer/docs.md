# Controlled Component

본 문서는 useDicomViewer hook 을 통해 외부에서 상태를 직접 핸들링하는 방식을 설명합니다.
useDicomViewer hook 의 용도, 사용 방법을 설명합니다.

## 목표

1. 사용자는 현재 보여지는 DICOM 정보를 알 수 있어야한다.
2. DICOM 정보가 업데이트 될 때, 이를 사용자가 알 수 있어야한다.
3. 사용자는 현재 보여지는 DICOM 정보를 직접 조작할 수 있어야한다.

## 동작 방식

- useDicomViewer 를 통해 현재 viewerStatus, setViewerStatus 를 가져올 수 있다.
- setViewerStatus 를 통해 외부에서 상태를 직접 핸들링할 수 있다.
- useEffect 를 통해 viewerStatus 의 변경 사항을 감지하여 외부에 반영할 수 있다.
- useEffect 를 통해 viewerStatus 의 viewport, image 변경 사항을 트래킹 할 수 있다.
