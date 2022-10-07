import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { Box } from "@mui/system";
import InputLabel from "@material-ui/core/InputLabel";

// const defaultValues = {
//   name: "",
//   os: "",
//   priceRange: [0,110],
// };
const SideBar2 = (props) => {
  // const [formValues, setFormValues] = useState(defaultValues);
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };
  // const handleSliderChange = (name) => (e, value) => {
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formValues);
  // };

  // function valuetext(formValues) {
  //   return {formValues};
  // }

  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container alignItems="center" justifyContent="center" direction="column">
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="Artist Name"
            type="text"
            value={props.formValues.name}
            onChange={props.handleInputChange}
          />
        </Grid>
        {/* <Grid item>
          <TextField
            id="age-input"
            name="age"
            label="Age"
            type="number"
            value={formValues.age}
            onChange={handleInputChange}
          />
        </Grid> */}
        {/* <Grid item>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="male"
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                key="female"
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                key="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid> */}
        <Box sx={{ minWidth: 170 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                label="Category"
                value={props.formValues.category}
                onChange={props.handleInputChange}
              >
                <MenuItem value={'Photographer'}>Photographer</MenuItem>
                <MenuItem value={'Musician'}>Musician</MenuItem>
                <MenuItem value={'Vocalist'}>Vocalist</MenuItem>
                <MenuItem value={'Guitarist'}>Guitarist</MenuItem>
                <MenuItem value={'Band'}>Band</MenuItem>
                <MenuItem value={'Pianist'}>Pianist</MenuItem>
                <MenuItem value={'Bassist'}>Bassist</MenuItem>
                <MenuItem value={'Dancer'}>Dancer</MenuItem>
                <MenuItem value={'Painter'}>Painter</MenuItem>
                <MenuItem value={'All'}>All</MenuItem>
              </Select>
            </FormControl>
        </Box>
        <Grid item>
          <div style={{ width: "165px",marginTop:'15px'}}>
            Hourly-Rate:
            <Slider
              value={props.formValues.priceRange}
              onChange={props.handleSliderChange("priceRange")}
              defaultValue={1}
              // getAriaLabel={() => 'Temperature range'}
              // value={value}
              // onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={props.valuetext}
              min={0}
              max={2000}
            />
             ${props.formValues.priceRange[0]} - ${props.formValues.priceRange[1]}
          </div>
        </Grid>
        {/* <Button variant="contained" color="primary" type="submit">
          Submit
        </Button> */}
      </Grid>
    </form>
  );
};
export default SideBar2;