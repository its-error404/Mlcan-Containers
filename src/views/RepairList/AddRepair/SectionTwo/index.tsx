import { Button, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormikValues } from 'formik'; 
import CustomInput from '../../../../shared/components/InputField';
import CustomSelect from '../../../../shared/components/SelectField';
import { RepairFormMeta } from '../../../../services/RepairListService/repair.service';

interface SectionTwoProps {
  onclose: () => void
  formik: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
  };
  sectionCompleted?: boolean
}

const SectionTwo: React.FC<SectionTwoProps> = ({ onclose, formik, sectionCompleted }) => {

const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
const [modeOptions, setModeOptions] = useState([])

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked)
  }

  useEffect(() => {
    const fetchCont = async () => {
      try {
        const repCategoriesOptions = await RepairFormMeta();
        const modeOptionsData = repCategoriesOptions.repCategoriesOptionsData;
        setModeOptions(modeOptionsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCont();
  }, []);
  
  return (
    <div>
      <div className={`section-two ${isCheckboxChecked ? 'disabled' : ''}`}>
        <Checkbox
          className='no-input-box'
          onChange={handleCheckboxChange}
          checked={isCheckboxChecked}
        >
          N/A
        </Checkbox>
        <div
          className={`non-maersk-details-section ${
            isCheckboxChecked ? 'disabled' : ''
          }`}
        >
          <hr></hr>
          <h4>Cost Details</h4>
          <div style={{ marginBottom: '30px' }}>
            <div className='repair-details__first-col'>
              <div className='input__repair-id'>
                <CustomInput
                  name='max_mat_cost'
                  id='max_mat_cost'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.max_mat_cost}
                  label='Max. Mat. Cost'
                  placeholder='Enter'
                ></CustomInput>
              </div>
              <div className='input__repair-Area'>
                <CustomInput
                  name='unit_mat_cost'
                  id='unit_mat_cost'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.unit_mat_cost}
                  label='Unit. Mat. Cost'
                  placeholder='Enter'
                ></CustomInput>
              </div>
            </div>
            <div className='repair-details__first-col'>
              <div className='input__repair-id'>
                <CustomInput
                  name='unit_hours'
                  id='unit_hours'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.unit_hours}
                  label='Hours Per Unit'
                  placeholder='Enter'
                ></CustomInput>
              </div>
              <div className='input__repair-Area'>
                <CustomInput
                  name='max_pcs'
                  id='max_pcs'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.max_pcs}
                  label='Max Pieces'
                  placeholder='Enter'
                ></CustomInput>
              </div>
            </div>
            <div className='repair-details__first-col'>
              <div className='input__repair-id'>
                <CustomInput
                  name='unit'
                  id='unit'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.unit}
                  label='Units'
                  placeholder='Enter'
                ></CustomInput>
              </div>
            </div>
          </div>
          <hr></hr>
          
          <div>
          <h4  style={{marginBottom: "30px"}}>Customer Related Details</h4>
          
          <div className='repair-details__second-col' >
            <div className='input__repair-id container-repair-area' >
              <CustomSelect
                className='select-choices'
                label='Repair Mode'
                name='repMode'
                id='repMode'
                placeholder='Enter'
                onBlur={formik.handleBlur}
                value={formik.values.mode}
                onChange={formik.handleChange}
                options={modeOptions.map(option => ({
                  label: option,
                  value: option
                }))}
              >
                <option value=''>Select</option>
                {modeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </CustomSelect>
            </div>
            <br></br>
            <div className='input__repair-Area container-repair-area'>
              <CustomSelect
                className='select-choices'
                label='Mode Number'
                name='mode'
                id='mode'
                placeholder='Enter'
                onBlur={formik.handleBlur}
                value={formik.values.mode}
                onChange={formik.handleChange}
                options={modeOptions.map(option => ({
                  label: option,
                  value: option
                }))}
              >
                <option value=''>Select</option>
                {modeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </div>
          </div>
          <div className='repair-details__first-col container-repair-area'>
            <div className='input__repair-id'>
            <CustomSelect
                className='select-choices'
                label='Repair Code'
                name='repCode'
                id='repCode'
                placeholder='Enter'
                onBlur={formik.handleBlur}
                value={formik.values.comp}
                onChange={formik.handleChange}
                options={modeOptions.map(option => ({
                  label: option,
                  value: option
                }))}
              >
                <option value=''>Select</option>
                {modeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </CustomSelect>
            </div>
            <div className='input__repair-id' style={{marginLeft: '58px'}}>
              <CustomInput
                name='comb'
                id='comb'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.comb}
                label='Combined'
                placeholder='Enter'
              ></CustomInput>
            </div>
          </div>
          <div className='repair-details__first-col'>
            <div className='input__repair-id'>
              <CustomInput
                name='desc'
                id='desc'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.desc}
                label='Description'
                placeholder='Enter'
              ></CustomInput>
            </div>
            <div className='input__repair-id'  style={{marginLeft: '58px'}}>
              <CustomInput
                name='id'
                id='id'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.id}
                label='ID Source'
                placeholder='Enter'
              ></CustomInput>
            </div>
          </div>
        </div>
      <div className="button-container">
        <Button type="primary" onClick={onclose}>
          Discard
        </Button>
        <button type="submit" className="final-buttons">
          Add Repair
        </button>
      </div>
    </div>
    </div>
  );
};

export default SectionTwo;
