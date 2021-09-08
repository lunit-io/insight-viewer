import { useCallback, useMemo, useState } from 'react'
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import PlusIcon from '@material-ui/icons/AddOutlined'
import MinusIcon from '@material-ui/icons/RemoveOutlined'
import clsx from 'clsx'
import reduce from 'lodash/reduce'
import { concat } from 'lodash'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    zoomWrapper: {
      position: 'absolute',
      bottom: 76,
      right: '16px',
    },
    zoomWrapperNoSubdrawer: {
      right: '20px',
    },
    slideContainer: {
      backgroundColor: '#8694B1',
      borderRadius: 4,
      color: '#fff',
      '& .Mui-selected': {
        color: '#fff',
        backgroundColor: '#443AFF',
        '&:hover': {
          backgroundColor: '#443AFF',
        },
      },
    },
    zoomLevelButton: {
      backgroundColor: '#fff',
      color: '#585858',
      padding: '5px 7px',
      borderTop: 'none !important', // to override MuiToggleButtonGroup's style
      borderLeft: '1px solid rgba(134, 148, 177, 0.16)',
      borderRight: '1px solid rgba(134, 148, 177, 0.16)',
      borderBottom: '2px solid rgba(134,148,177,0.16)',
      ...theme.typography.body2,
      '&:hover': {
        backgroundColor: '#443AFF',
        color: '#fff',
      },
      // Plus btn
      '&:first-child': {
        minWidth: 'inherit',
        backgroundColor: '#fff',
        color: 'rgba(134,148,177,0.8)',
        borderTop: '1px solid rgba(134, 148, 177, 0.16) !important',
      },
      // Minus btn
      '&:last-child': {
        minWidth: 'inherit',
        backgroundColor: '#fff',
        color: 'rgba(134,148,177,0.8)',
        border: '1px solid rgba(134, 148, 177, 0.16)',
      },
    },
    labelController: {
      color: '#7292FD',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
)

const DEFAULT_ZOOM_LEVELS = [0, 0.5, 1, 2, 5, 10, 20, 40, 160]

export interface ZoomControllerProps {
  noSubdrawer?: boolean
  zoom: number
  minZoomLevel: number
  maxZoomLevel: number
  onZoom?: (newValue: number) => void
}

const ZoomController = ({
  noSubdrawer,
  zoom: zoomState,
  minZoomLevel,
  // @todo maxZoomLevel을 구현할 것인지 검토(viewport host component와 스펙 통일)
  onZoom,
}: ZoomControllerProps) => {
  const classes = useStyles()
  const [levelLabelHidden, setLevelLabelHidden] = useState<boolean>(false)

  const handleChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newZoomLevel: number) => {
      if (!onZoom) {
        return
      }
      onZoom(newZoomLevel)
    },
    [onZoom]
  )

  const zoomLevelLabels = useMemo(() => {
    return reduce(
      DEFAULT_ZOOM_LEVELS,
      (zoomLevels, currLevel) =>
        minZoomLevel >= currLevel ? zoomLevels : concat(zoomLevels, currLevel),
      [minZoomLevel]
    )
  }, [minZoomLevel])

  const getClosestZoomLevel = useCallback(
    (target: number) =>
      zoomLevelLabels.reduce((prev, curr) =>
        Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
      ),
    [zoomLevelLabels]
  )

  const closetZoomLevel = useMemo(
    () => getClosestZoomLevel(zoomState),
    [getClosestZoomLevel, zoomState]
  )

  const handleZoomIn = useCallback(() => {
    if (!onZoom) {
      return
    }
    const currentIdx = zoomLevelLabels.findIndex(
      level => level === getClosestZoomLevel(zoomState)
    )
    if (currentIdx === zoomLevelLabels.length - 1) {
      return
    }
    const nextIdx = currentIdx + 1
    return onZoom(zoomLevelLabels[nextIdx])
  }, [getClosestZoomLevel, zoomState, zoomLevelLabels, onZoom])

  const handleZoomOut = useCallback(() => {
    if (!onZoom) {
      return
    }
    const currentIdx = zoomLevelLabels.findIndex(
      level => level === getClosestZoomLevel(zoomState)
    )
    if (currentIdx === 0) {
      return
    }
    const nextIdx = currentIdx - 1
    return onZoom(zoomLevelLabels[nextIdx])
  }, [getClosestZoomLevel, zoomState, zoomLevelLabels, onZoom])

  return (
    <div
      className={clsx(classes.zoomWrapper, {
        [classes.zoomWrapperNoSubdrawer]: noSubdrawer,
      })}
    >
      <div className={classes.slideContainer}>
        <ToggleButtonGroup
          size="small"
          orientation="vertical"
          value={closetZoomLevel}
          exclusive
          onChange={handleChange}
        >
          <Tooltip
            interactive
            placement="left"
            title={
              <div>
                Zoom{' '}
                <div
                  className={classes.labelController}
                  onClick={() => setLevelLabelHidden(!levelLabelHidden)}
                >
                  {levelLabelHidden ? 'Show' : 'Hide'} labels
                </div>
              </div>
            }
            aria-label="zoom-in"
          >
            <Button
              className={classes.zoomLevelButton}
              aria-label="zoom-in"
              onClick={handleZoomIn}
            >
              <PlusIcon />
            </Button>
          </Tooltip>
          {!levelLabelHidden &&
            zoomLevelLabels
              // https://stackoverflow.com/questions/5024085/whats-the-point-of-slice0-here
              .slice(0)
              .reverse()
              .map((level, index) => (
                <ToggleButton
                  key={`zoom-level-${level}`}
                  className={classes.zoomLevelButton}
                  value={level}
                  aria-label={level.toString()}
                >
                  <span>
                    {level <= 40 && index < zoomLevelLabels.length - 1
                      ? `X${level}`
                      : level > 40
                      ? 'MAX'
                      : 'MIN'}
                  </span>
                </ToggleButton>
              ))}
          <Tooltip
            interactive
            placement="left"
            title={
              <div>
                Zoom{' '}
                <div
                  className={classes.labelController}
                  onClick={() => setLevelLabelHidden(!levelLabelHidden)}
                >
                  {levelLabelHidden ? 'Show' : 'Hide'} labels
                </div>
              </div>
            }
            aria-label="zoom-out"
          >
            <Button
              className={classes.zoomLevelButton}
              aria-label="zoom-out"
              onClick={handleZoomOut}
            >
              <MinusIcon />
            </Button>
          </Tooltip>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default ZoomController
