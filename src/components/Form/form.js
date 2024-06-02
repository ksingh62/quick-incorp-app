import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Personal Details */}
      <div>
        <label>
          First Name
          <input
            className="text-black"
            type="text"
            {...register("firstName", {
              required: {
                value: "true",
                message: "First Name is Required",
              },
            })}
          />
        </label>
        <p>{errors.firstName?.message}</p>
      </div>

      <div>
        <label>
          Last Name
          <input
            className="text-black"
            type="text"
            {...register("lastName", {
              required: {
                value: "true",
                message: "Last Name is Required",
              },
            })}
          />
          <p>{errors.lastName?.message}</p>
        </label>
      </div>

      <div>
        <label>
          Phone Number
          <input
            className="text-black"
            type="tel"
            {...register("phoneNumber")}
          />
        </label>
      </div>

      {/* Corporation Details */}
      <div>
        <label>
          Corporation Name
          <input
            className="text-black"
            type="text"
            {...register("corporationName", {
              required: {
                value: true,
                message: "Corporation Name is required.",
              },
              minLength: {
                value: 5,
                message:
                  "Corporation Name should at least be 5 characters long.",
              },
            })}
          />
        </label>
        <p>{errors.corporationName?.message}</p>
      </div>

      <FormControl fullWidth>
        <label>
          Choose your type of incorporation
          <Select defaultValue="" {...register("corpType")}>
            <MenuItem value={"federal"}>Federal</MenuItem>
            <MenuItem value={"provincial"}>Provincial</MenuItem>
          </Select>
        </label>
      </FormControl>

      <FormControl fullWidth>
        <label>
          Choose your Province
          <Select defaultValue="" {...register("province")}>
            {[
              { province: "Alberta", abbr: "AB" },
              { province: "British Columbia", abbr: "BC" },
              { province: "Manitoba", abbr: "MB" },
              { province: "New Brunswick", abbr: "NB" },
              { province: "Newfoundland and Labrador", abbr: "NL" },
              { province: "Northwest Territories", abbr: "NT" },
              { province: "Nova Scotia", abbr: "NS" },
              { province: "Nunavut", abbr: "NU" },
              { province: "Ontario", abbr: "ON" },
              { province: "Prince Edward Island", abbr: "PE" },
              { province: "Quebec", abbr: "QC" },
              { province: "Saskatchewan", abbr: "SK" },
              { province: "Yukon", abbr: "YT" },
            ].map((province, index) => (
              <MenuItem key={index} value={province.abbr}>
                {province.province}
              </MenuItem>
            ))}
          </Select>
        </label>
      </FormControl>

      <button type="submit">Submit</button>
    </form>
  );
}

/* 
Personal Details
-First Name
-Last Name
-Phone Number

Corporation Details
-Name of Corporation
-Choose your type of incorporation
-Choose your province

Business Address
-Address
-City
-Province
-Country
-Postal Code

Plans
Payment
*/
