import { SvgIcon } from '@material-ui/core';
import createSvgIcon from '@material-ui/icons/utils/createSvgIcon';
import { ComponentType, createElement } from 'react';
import { ReactComponent as Adjust } from './assets/ico-adjust.svg';
import { ReactComponent as CircleFilled } from './assets/ico-circle-filled.svg';
import { ReactComponent as Circle } from './assets/ico-circle.svg';
import { ReactComponent as Contour } from './assets/ico-contour.svg';
import { ReactComponent as Flip } from './assets/ico-flip.svg';
import { ReactComponent as Heatmap } from './assets/ico-heatmap.svg';
import { ReactComponent as Invert } from './assets/ico-invert.svg';
import { ReactComponent as Lunit } from './assets/ico-lunit.svg';
import { ReactComponent as Magnify } from './assets/ico-magnify.svg';
import { ReactComponent as Pan } from './assets/ico-pan.svg';
import { ReactComponent as Pen } from './assets/ico-pen.svg';
import { ReactComponent as Reset } from './assets/ico-reset.svg';
import { ReactComponent as User } from './assets/ico-user.svg';

function toMaterialIcon(Icon: ComponentType): typeof SvgIcon {
  return createSvgIcon(
    createElement(Icon),
    Icon.displayName || 'OPTControlIcon',
  );
}

export const AdjustIcon = toMaterialIcon(Adjust);
export const FlipIcon = toMaterialIcon(Flip);
export const InvertIcon = toMaterialIcon(Invert);
export const MagnifyIcon = toMaterialIcon(Magnify);
export const PanIcon = toMaterialIcon(Pan);
export const PenIcon = toMaterialIcon(Pen);
export const ResetIcon = toMaterialIcon(Reset);
export const CircleIcon = toMaterialIcon(Circle);
export const CircleFilledIcon = toMaterialIcon(CircleFilled);
export const ContourIcon = toMaterialIcon(Contour);
export const HeatmapIcon = toMaterialIcon(Heatmap);
export const LunitIcon = toMaterialIcon(Lunit);
export const UserIcon = toMaterialIcon(User);
