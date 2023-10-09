import { useFormik } from "formik";
import React, { useState } from "react";
import {
  MercPlusDetails,
  NonMaerskDetails,
  RepairDetails,
} from "../../../models/repairForm.model";
import repairDetailsSchema from "./FormValidation";
import "./AddRepair.scss";
import { ReactComponent as TickIcon } from '../../../assets/single color icons - SVG/done.svg'
import { ReactComponent as CloseIcon } from "../../../assets/single color icons - SVG/close.svg";
import '../../../styles/_variables.scss'
import SectionTwo from "./SectionTwo";
import SectionOne from "./SectionOne";
import SectionZero from "./SectionZero";
import { addRepairRequest } from "../../../services/RepairListService/repair.service";

const AddRepair = ({ onclose }: { onclose: () => void }) => {
  const initialRepairFormValues = {
    ...new RepairDetails(),
    ...new MercPlusDetails(),
    ...new NonMaerskDetails(),
  };

  const [sectionIndex, setSectionIndex] = useState<number | null>(0)
  const sections = [
    {
      name: "Repair Details",
      schema: repairDetailsSchema,
    },
    {
      name: "Non-Maersk Details",
      schema: null,
    },
    {
      name: "Merc+ Details",
      schema: null,
    },
  ];

  const toggleSection = (index: number) => {
    setSectionIndex(index === sectionIndex ? null : index)
  }

  const handleNextSection = () => {
    if (sectionIndex !== null && sectionIndex < sections.length - 1) {
      sectionCompleted[sectionIndex] = true;
      setSectionIndex(sectionIndex + 1);
    }
  };
  const [sectionCompleted,] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

 
    const formik = useFormik({
        initialValues: initialRepairFormValues,
        validationSchema: repairDetailsSchema,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: async (values: any) => {
            try {
                await addRepairRequest(values)
            } catch (err) {
                console.log(err)
            }
        }
    });

    return (
        <div className="repair-details-form">
            <div className="form-wrapper">
                <div className="form-header">
                    <h2>Add Repair Part</h2>
                    <CloseIcon width={15} onClick={onclose} />
                </div>
                <div className="section-buttons add-repair-section">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={`section-button ${sectionIndex === index ? "form-active" : ""}`}
                            onClick={() => toggleSection(index)}
                        >
                            <div className="section-title">
                            {sectionCompleted ? (
            <TickIcon width={20} />
          ) : (
            <TickIcon width={20} /> 
          )}
                                <span className="section-header-text">{section.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                <form onSubmit={formik.handleSubmit}>
    {sectionIndex === 0 && (
      <SectionZero
        formik={formik}
        onclose={onclose}
        onNextSection={handleNextSection}
        sectionCompleted={sectionCompleted[0]}
      />
    )}
    {sectionIndex === 1 && (
      <SectionOne
        formik={formik}
        onclose={onclose}
        onNextSection={handleNextSection}
        sectionCompleted={sectionCompleted[1]}
      />
    )}
    {sectionIndex === 2 && (
      <SectionTwo
        formik={formik}
        onclose={onclose}
        sectionCompleted={sectionCompleted[2]}
      />
    )}
  </form>
                </div>
            </div>
        </div>
        <div className="section-buttons add-repair-section">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`section-button ${sectionIndex === index ? "form-active" : ""}`}
              onClick={() => toggleSection(index)}
            >
              <div className="section-title">
                {sectionCompleted[index] ? (
                  <TickIcon width={20} className="tick-icon-filled"/>
                ) : (
                  <TickIcon width={20} />
                )}
                <span className="section-header-text">{section.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            {sectionIndex === 0 && (
              <SectionZero
                formik={formik}
                onclose={onclose}
                onNextSection={handleNextSection}
                sectionCompleted={sectionCompleted[0]}
              />
            )}
            {sectionIndex === 1 && (
              <SectionOne
                formik={formik}
                onclose={onclose}
                onNextSection={handleNextSection}
                sectionCompleted={sectionCompleted[1]}
              />
            )}
            {sectionIndex === 2 && (
              <SectionTwo
                formik={formik}
                onclose={onclose}
                sectionCompleted={sectionCompleted[2]}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRepair;
