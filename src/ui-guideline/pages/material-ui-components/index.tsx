import {
  getContrastText,
  LunitButton,
  lunitDark,
  lunitDarkTheme,
  ScrollContainer,
  ThemeProvider,
} from '@lunit/insight-ui';
import {
  Button,
  ButtonGroup,
  ButtonProps,
  Checkbox,
  Color,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import {
  Alarm,
  ArrowDropDown,
  CloudUpload,
  Send,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
} from '@material-ui/icons';
import { DefaultTheme, Styles, useTheme, withStyles } from '@material-ui/styles';
import eachOptions from '@ssen/each-options';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

const buttonOptions = eachOptions<ComponentProps<typeof Button>>({
  variant: ['contained', 'outlined', 'text'],
  size: ['small', 'medium', 'large'],
  disabled: [false, true],
});

const lunitButtonProps = eachOptions<ComponentProps<typeof LunitButton>>({
  disabled: [false, true],
});

const iconButtonOptions = eachOptions<ComponentProps<typeof IconButton>>({
  size: ['small', 'medium'],
  disabled: [false, true],
});

const buttonGroupOptions = eachOptions<ComponentProps<typeof ButtonGroup>>({
  orientation: ['horizontal', 'vertical'],
  variant: ['contained', 'outlined', 'text'],
  size: ['small', 'medium', 'large'],
  disabled: [false, true],
});

const splitButtonOptions = eachOptions<ComponentProps<typeof ButtonGroup>>({
  variant: ['contained', 'outlined', 'text'],
  size: ['small', 'medium', 'large'],
  disabled: [false, true],
});

const switchOptions = eachOptions<ComponentProps<typeof Switch>>({
  size: ['small', 'medium'],
  disabled: [false, true],
});

const sliderOptions = eachOptions<ComponentProps<typeof Slider>>({
  marks: [false, [0, 20, 40, 60, 80, 100].map((value) => ({ value }))],
  disabled: [false, true],
});

const DropDownButton = withStyles<Styles<DefaultTheme, ButtonProps, 'root'>>({
  root: {
    minWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
})(Button);

const textFieldOptions = eachOptions<TextFieldProps>({
  size: ['small', 'medium'],
  disabled: [false, true],
});

const selectOptions = eachOptions<ComponentProps<typeof Select>>({
  disabled: [false, true],
});

const radioOptions = eachOptions<ComponentProps<typeof Radio>>({
  size: ['small', 'medium'],
  disabled: [false, true],
});

const checkBoxOptions = eachOptions<ComponentProps<typeof Checkbox>>({
  disabled: [false, true],
});

export default function () {
  const theme = useTheme();

  return (
    <Container>
      <Group>
        <ColorLayout>
          <ColorTable color={theme.palette.grey} />

          <ColorMap color={theme.palette.primary} />

          <ColorMap color={theme.palette.secondary} />

          <ColorMap color={theme.palette.info} />

          <ColorMap color={theme.palette.success} />

          <ColorMap color={theme.palette.warning} />

          <ColorMap color={theme.palette.error} />
        </ColorLayout>

        {buttonOptions.map((props) => (
          <Section>
            <Button {...props} color="default">
              BUTTON
            </Button>
            <Button {...props} color="primary">
              BUTTON
            </Button>
            <Button {...props} color="secondary">
              BUTTON
            </Button>
            <Button {...props} color="default" startIcon={<CloudUpload />}>
              BUTTON
            </Button>
            <Button {...props} color="primary" startIcon={<Send />}>
              BUTTON
            </Button>
            <Button {...props} color="secondary" startIcon={<Alarm />}>
              BUTTON
            </Button>
            <Button {...props} color="default" endIcon={<CloudUpload />}>
              BUTTON
            </Button>
            <Button {...props} color="primary" endIcon={<Send />}>
              BUTTON
            </Button>
            <Button {...props} color="secondary" endIcon={<Alarm />}>
              BUTTON
            </Button>
          </Section>
        ))}

        {lunitButtonProps.map((props) => (
          <Section>
            <LunitButton {...props}>BUTTON</LunitButton>
            <LunitButton {...props} color={{ root: lunitDark.control.secondary }}>
              BUTTON
            </LunitButton>
          </Section>
        ))}

        <ThemeProvider theme={lunitDarkTheme}>
          {lunitButtonProps.map((props) => (
            <Section>
              <LunitButton {...props}>BUTTON</LunitButton>
              <LunitButton {...props} color={{ root: lunitDark.control.secondary }}>
                BUTTON
              </LunitButton>
            </Section>
          ))}
        </ThemeProvider>

        {iconButtonOptions.map((props) => (
          <Section>
            <IconButton {...props} color="default">
              <CloudUpload />
            </IconButton>
            <IconButton {...props} color="primary">
              <Send />
            </IconButton>
            <IconButton {...props} color="secondary">
              <Alarm />
            </IconButton>
            <IconButton {...props} color="default">
              <CloudUpload />
            </IconButton>
            <IconButton {...props} color="primary">
              <Send />
            </IconButton>
            <IconButton {...props} color="secondary">
              <Alarm />
            </IconButton>
          </Section>
        ))}

        {buttonGroupOptions.map((props) => (
          <Section>
            <ButtonGroup {...props} color="default">
              <Button>ONE</Button>
              <Button>TWO</Button>
              <Button>THREE</Button>
            </ButtonGroup>
            <ButtonGroup {...props} color="primary">
              <Button>ONE</Button>
              <Button>TWO</Button>
              <Button>THREE</Button>
            </ButtonGroup>
            <ButtonGroup {...props} color="secondary">
              <Button>ONE</Button>
              <Button>TWO</Button>
              <Button>THREE</Button>
            </ButtonGroup>
            <ButtonGroup {...props} color="default">
              <Button startIcon={<CloudUpload />}>ONE</Button>
              <Button startIcon={<Send />}>TWO</Button>
              <Button startIcon={<Alarm />}>THREE</Button>
            </ButtonGroup>
            <ButtonGroup {...props} color="primary">
              <Button endIcon={<CloudUpload />}>ONE</Button>
              <Button endIcon={<Send />}>TWO</Button>
              <Button endIcon={<Alarm />}>THREE</Button>
            </ButtonGroup>
            <ButtonGroup {...props} color="secondary">
              <Button startIcon={<CloudUpload />}>ONE</Button>
              <Button startIcon={<Send />}>TWO</Button>
              <Button startIcon={<Alarm />}>THREE</Button>
            </ButtonGroup>
          </Section>
        ))}

        {splitButtonOptions.map((props) => (
          <Section>
            <ButtonGroup {...props} color="default">
              <Button>BUTTON</Button>
              <DropDownButton>
                <ArrowDropDown />
              </DropDownButton>
            </ButtonGroup>
            <ButtonGroup {...props} color="primary">
              <Button>BUTTON</Button>
              <DropDownButton>
                <ArrowDropDown />
              </DropDownButton>
            </ButtonGroup>
            <ButtonGroup {...props} color="secondary">
              <Button>BUTTON</Button>
              <DropDownButton>
                <ArrowDropDown />
              </DropDownButton>
            </ButtonGroup>
            <ButtonGroup {...props} color="default">
              <Button startIcon={<CloudUpload />}>BUTTON</Button>
              <DropDownButton>
                <ArrowDropDown />
              </DropDownButton>
            </ButtonGroup>
            <ButtonGroup {...props} color="primary">
              <Button startIcon={<Send />}>BUTTON</Button>
              <DropDownButton>
                <ArrowDropDown />
              </DropDownButton>
            </ButtonGroup>
            <ButtonGroup {...props} color="secondary">
              <Button startIcon={<Alarm />}>BUTTON</Button>
              <DropDownButton>
                <ArrowDropDown />
              </DropDownButton>
            </ButtonGroup>
          </Section>
        ))}

        {switchOptions.map((props) => (
          <Section>
            <Switch {...props} color="default" defaultChecked={false} />
            <Switch {...props} color="default" defaultChecked={true} />
            <Switch {...props} color="primary" defaultChecked={false} />
            <Switch {...props} color="primary" defaultChecked={true} />
            <Switch {...props} color="secondary" defaultChecked={false} />
            <Switch {...props} color="secondary" defaultChecked={true} />
          </Section>
        ))}

        {sliderOptions.map((props) => (
          <Section>
            <Slider {...props} color="primary" />
            <Slider {...props} color="secondary" />
          </Section>
        ))}

        {textFieldOptions.map(({ size, disabled, ...props }) => (
          <Section>
            <Button size={size} disabled={disabled}>
              BUTTON
            </Button>
            <TextField {...props} size={size} disabled={disabled} variant="standard" defaultValue="" />
            <Button size={size} disabled={disabled}>
              BUTTON
            </Button>
            <TextField {...props} size={size} disabled={disabled} variant="filled" defaultValue="" />
            <Button size={size} disabled={disabled}>
              BUTTON
            </Button>
            <TextField {...props} size={size} disabled={disabled} variant="outlined" defaultValue="" />
            <TextField
              {...props}
              size={size}
              disabled={disabled}
              variant="standard"
              defaultValue=""
              label="LABEL"
              color="secondary"
              helperText="HELPER TEXT"
            />
            <TextField
              {...props}
              size={size}
              disabled={disabled}
              variant="filled"
              defaultValue=""
              label="LABEL"
              color="secondary"
              helperText="HELPER TEXT"
            />
            <TextField
              {...props}
              size={size}
              disabled={disabled}
              variant="outlined"
              defaultValue=""
              label="LABEL"
              color="secondary"
              helperText="HELPER TEXT"
            />
          </Section>
        ))}

        {selectOptions.map((props) => (
          <Section>
            <Select {...props} value="FOO" variant="standard" onChange={() => {}}>
              <MenuItem value="FOO">FOO</MenuItem>
              <MenuItem value="BAR">BAR</MenuItem>
            </Select>

            <Select {...props} value="FOO" variant="filled" onChange={() => {}}>
              <MenuItem value="FOO">FOO</MenuItem>
              <MenuItem value="BAR">BAR</MenuItem>
            </Select>

            <Select {...props} value="FOO" variant="outlined" onChange={() => {}}>
              <MenuItem value="FOO">FOO</MenuItem>
              <MenuItem value="BAR">BAR</MenuItem>
            </Select>
          </Section>
        ))}

        {radioOptions.map((props) => (
          <Section>
            <RadioGroup value="A" onChange={() => {}}>
              <FormControlLabel value="A" label="A" control={<Radio {...props} color="default" />} />
              <FormControlLabel value="B" label="B" control={<Radio {...props} color="default" />} />
              <FormControlLabel value="C" label="C" control={<Radio {...props} color="default" />} />
            </RadioGroup>

            <RadioGroup value="A" onChange={() => {}}>
              <FormControlLabel value="A" label="A" control={<Radio {...props} color="primary" />} />
              <FormControlLabel value="B" label="B" control={<Radio {...props} color="primary" />} />
              <FormControlLabel value="C" label="C" control={<Radio {...props} color="primary" />} />
            </RadioGroup>

            <RadioGroup value="A" onChange={() => {}}>
              <FormControlLabel value="A" label="A" control={<Radio {...props} color="secondary" />} />
              <FormControlLabel value="B" label="B" control={<Radio {...props} color="secondary" />} />
              <FormControlLabel value="C" label="C" control={<Radio {...props} color="secondary" />} />
            </RadioGroup>

            <RadioGroup value="A" onChange={() => {}}>
              <FormControlLabel
                value="A"
                label="A"
                control={
                  <Radio
                    {...props}
                    color="default"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="B"
                label="B"
                control={
                  <Radio
                    {...props}
                    color="default"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="C"
                label="C"
                control={
                  <Radio
                    {...props}
                    color="default"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
            </RadioGroup>

            <RadioGroup value="A" onChange={() => {}}>
              <FormControlLabel
                value="A"
                label="A"
                control={
                  <Radio
                    {...props}
                    color="primary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="B"
                label="B"
                control={
                  <Radio
                    {...props}
                    color="primary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="C"
                label="C"
                control={
                  <Radio
                    {...props}
                    color="primary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
            </RadioGroup>

            <RadioGroup value="A" onChange={() => {}}>
              <FormControlLabel
                value="A"
                label="A"
                control={
                  <Radio
                    {...props}
                    color="secondary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="B"
                label="B"
                control={
                  <Radio
                    {...props}
                    color="secondary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="C"
                label="C"
                control={
                  <Radio
                    {...props}
                    color="secondary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
            </RadioGroup>
          </Section>
        ))}

        {checkBoxOptions.map((props) => (
          <Section>
            <FormGroup>
              <FormControlLabel value="A" label="A" control={<Checkbox {...props} color="default" checked />} />
              <FormControlLabel value="B" label="B" control={<Checkbox {...props} color="default" />} />
              <FormControlLabel value="C" label="C" control={<Checkbox {...props} color="default" />} />
            </FormGroup>

            <FormGroup>
              <FormControlLabel value="A" label="A" control={<Checkbox {...props} color="primary" checked />} />
              <FormControlLabel value="B" label="B" control={<Checkbox {...props} color="primary" />} />
              <FormControlLabel value="C" label="C" control={<Checkbox {...props} color="primary" />} />
            </FormGroup>

            <FormGroup>
              <FormControlLabel value="A" label="A" control={<Checkbox {...props} color="secondary" checked />} />
              <FormControlLabel value="B" label="B" control={<Checkbox {...props} color="secondary" />} />
              <FormControlLabel value="C" label="C" control={<Checkbox {...props} color="secondary" />} />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                value="A"
                label="A"
                control={
                  <Checkbox
                    {...props}
                    color="default"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                    checked
                  />
                }
              />
              <FormControlLabel
                value="B"
                label="B"
                control={
                  <Checkbox
                    {...props}
                    color="default"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="C"
                label="C"
                control={
                  <Checkbox
                    {...props}
                    color="default"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                value="A"
                label="A"
                control={
                  <Checkbox
                    {...props}
                    color="primary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                    checked
                  />
                }
              />
              <FormControlLabel
                value="B"
                label="B"
                control={
                  <Checkbox
                    {...props}
                    color="primary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="C"
                label="C"
                control={
                  <Checkbox
                    {...props}
                    color="primary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                value="A"
                label="A"
                control={
                  <Checkbox
                    {...props}
                    color="secondary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                    checked
                  />
                }
              />
              <FormControlLabel
                value="B"
                label="B"
                control={
                  <Checkbox
                    {...props}
                    color="secondary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
              <FormControlLabel
                value="C"
                label="C"
                control={
                  <Checkbox
                    {...props}
                    color="secondary"
                    icon={<SentimentVeryDissatisfied />}
                    checkedIcon={<SentimentVerySatisfied />}
                  />
                }
              />
            </FormGroup>
          </Section>
        ))}
      </Group>
    </Container>
  );
}

const Container = styled(ScrollContainer)``;

const Group = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Section = styled.div`
  display: flex;

  justify-content: left;
  align-items: center;

  :not(:first-child) {
    margin-top: 20px;
  }

  > :not(:first-child) {
    margin-left: 10px;
  }
`;

const ColorLayout = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: 10px;
  }
`;

const ColorTable = styled(({ color, className }: { color: Color; className?: string }) => (
  <table className={className}>
    <tbody>
      {Object.keys(color).map((key) => (
        <tr
          key={key}
          style={{
            backgroundColor: color[key],
            color: getContrastText(color[key]),
          }}
        >
          <td>{key}</td>
          <td>{color[key]}</td>
        </tr>
      ))}
    </tbody>
  </table>
))`
  width: 160px;

  border: 0;
  border-spacing: 0;

  tr {
    height: 30px;

    th,
    td {
      padding: 5px 10px;
    }
  }
`;

const ColorMap = styled(({ color, className }: { color: PaletteColor; className?: string }) => (
  <div className={className}>
    <div style={{ backgroundColor: color.light, color: color.contrastText }}>{color.light}</div>
    <div style={{ backgroundColor: color.main, color: color.contrastText }}>{color.main}</div>
    <div style={{ backgroundColor: color.dark, color: color.contrastText }}>{color.dark}</div>
  </div>
))`
  width: 160px;

  > :first-child,
  > :last-child {
    height: 30px;
  }

  > :nth-child(2) {
    height: 90px;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
