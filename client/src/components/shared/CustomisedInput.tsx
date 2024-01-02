import { TextField } from '@mui/material';

type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomisedInput = (props: Props) => {
  return (
    <TextField
      InputLabelProps={{ style: { color: 'black' } }}
      inputProps={{
        style: {
          width: '300px',
          borderRadius: 10,
          fontSize: 20,
          color: 'black',
        },
      }}
      name={props.name}
      label={props.label}
      type={props.type}
    />
  );
};

export default CustomisedInput;
