import { ControlledViewer } from './ControlledViewer';
import { MultiViewer } from './MultiViewer';
import {
  HighLevelDicomViewerWithHook,
  LowLevelDicomViewerWithHook,
} from './DicomViewerWithHook';

function App() {
  return <HighLevelDicomViewerWithHook />;
  // return <LowLevelDicomViewerWithHook />;
  // return <MultiViewer />;
  // return <ControlledViewer />;
}

export default App;
