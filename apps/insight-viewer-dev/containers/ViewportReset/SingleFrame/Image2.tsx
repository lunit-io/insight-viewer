import { useCallback, useEffect, useRef } from 'react'
import { Box, Stack, Switch, Button, Text } from '@chakra-ui/react'
import InsightViewer, { useImage } from '@lunit/insight-viewer'
import { useViewport } from '@lunit/insight-viewer/viewport'

import useImageSelect from '../../../components/ImageSelect/useImageSelect'
import { ViewerWrapper } from '../../../components/Wrapper'
import CustomProgress from '../../../components/CustomProgress'
import OverlayLayer from '../../../components/OverlayLayer'
import CodeBlock from '../../../components/CodeBlock'

import { NON_RESET_VIEWPORT_CODE } from './Code'

import type { Viewport } from '@lunit/insight-viewer/viewport'

const INITIAL_VIEWPORT = {
  scale: 0.5,
  windowWidth: 100,
  windowCenter: 32,
}

export default function Image2(): JSX.Element {
  const viewerRef = useRef<HTMLDivElement>(null)

  const currentViewportRef = useRef<Viewport>()

  const { ImageSelect, selected } = useImageSelect()
  const { loadingState, image } = useImage({ wadouri: selected })

  const { viewport, initialized, setViewport, resetViewport } = useViewport({
    image,
    viewerRef,
    options: { fitScale: false },
    getInitialViewport: (prevViewport) => ({ ...prevViewport, ...(currentViewportRef.current ?? INITIAL_VIEWPORT) }),
  })

  const updateViewport = useCallback(
    (key: keyof Viewport, value: unknown) => {
      setViewport((prev: Viewport) => ({
        ...prev,
        [key]: value,
      }))
    },
    [setViewport]
  )

  useEffect(() => {
    /**
     * If viewport is the initial value, viewportRef does not initialize.
     * If you later update the viewport, use the value to assign
     * it to Ref and use it to obtain the initial viewport value.
     */
    if (!initialized) return

    currentViewportRef.current = viewport
  }, [initialized, viewport])

  const resetViewportAndCurrentViewportRef = () => {
    currentViewportRef.current = undefined

    resetViewport()
  }

  return (
    <Box>
      <Box mb={6}>
        <Text className="test">이미지 변경 시 뷰포트 변경 (유저가 변경한 현재 뷰포트 유지)</Text>
      </Box>
      <Box mb={6}>
        <ImageSelect />
      </Box>
      <Stack align="flex-start" spacing="20px">
        <Box mb={6}>
          <Stack spacing="24px" mt={3} direction="row">
            <Box>
              <Box>x transition {viewport.x}</Box>
              <Box>
                <input
                  type="range"
                  id="x"
                  name="x"
                  min="0"
                  max="100"
                  step="10"
                  onChange={(e) => {
                    updateViewport('x', Number(e.target.value))
                  }}
                  className="x-control"
                  value={viewport?.x ?? 0}
                />
              </Box>
            </Box>
            <Box>
              <Box>y transition {viewport.y}</Box>
              <Box>
                <input
                  type="range"
                  id="y"
                  name="y"
                  min="0"
                  max="100"
                  step="10"
                  onChange={(e) => {
                    updateViewport('y', Number(e.target.value))
                  }}
                  className="y-control"
                  value={viewport?.y ?? 0}
                />
              </Box>
            </Box>
            <Button colorScheme="blue" onClick={resetViewportAndCurrentViewportRef} className="reset">
              Reset
            </Button>
          </Stack>

          <Stack spacing="24px" mt={3} direction="row">
            <Box>
              <Box>windowWidth {viewport.windowWidth}</Box>
              <Box>
                <input
                  type="range"
                  id="windowWidth"
                  name="windowWidth"
                  min="0"
                  max="300"
                  step="10"
                  onChange={(e) => {
                    updateViewport('windowWidth', Number(e.target.value))
                  }}
                  className="window-width-control"
                  value={viewport?.windowWidth ?? 0}
                />
              </Box>
            </Box>
            <Box>
              <Box>windowCenter {viewport.windowCenter}</Box>
              <Box>
                <input
                  type="range"
                  id="windowCenter"
                  name="windowCenter"
                  min="0"
                  max="300"
                  step="10"
                  onChange={(e) => {
                    updateViewport('windowCenter', Number(e.target.value))
                  }}
                  className="window-center-control"
                  value={viewport?.windowCenter ?? 0}
                />
              </Box>
            </Box>
            <Box>
              <Box>scale {viewport.scale}</Box>
              <Box>
                <input
                  type="range"
                  id="scale"
                  name="scale"
                  min="0.5"
                  max="2"
                  step="0.1"
                  onChange={(e) => {
                    updateViewport('scale', Number(e.target.value))
                  }}
                  className="scale-control"
                  value={viewport?.scale ?? 0}
                />
              </Box>
            </Box>
          </Stack>
          <Stack spacing="24px" direction="row" mt={6}>
            <Box>
              invert{' '}
              <Switch
                onChange={(e) => updateViewport('invert', e.target.checked)}
                className="invert-control"
                isChecked={viewport.invert}
              />
            </Box>
            <Box>
              hflip{' '}
              <Switch
                onChange={(e) => updateViewport('hflip', e.target.checked)}
                className="hflip-control"
                isChecked={viewport?.hflip ?? false}
              />
            </Box>
            <Box>
              vflip{' '}
              <Switch
                onChange={(e) => updateViewport('vflip', e.target.checked)}
                className="vflip-control"
                isChecked={viewport?.vflip ?? false}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Box data-cy-loaded={loadingState} data-cy-viewport={initialized}>
        <ViewerWrapper className="viewer1">
          <InsightViewer
            viewerRef={viewerRef}
            image={image}
            viewport={viewport}
            onViewportChange={setViewport}
            Progress={CustomProgress}
          >
            <OverlayLayer viewport={viewport} />
          </InsightViewer>
        </ViewerWrapper>
      </Box>
      <Box>
        <CodeBlock code={NON_RESET_VIEWPORT_CODE} />
      </Box>
    </Box>
  )
}
