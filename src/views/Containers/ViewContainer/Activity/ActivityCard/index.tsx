import React, { useEffect, useState } from "react";
import { ReactComponent as QuoteIcon } from "../../../../../assets/single color icons - SVG/quote.svg";
import { ReactComponent as RepairIcon } from "../../../../../assets/single color icons - SVG/repair.svg";
import { ReactComponent as InspectionIcon } from "../../../../../assets/single color icons - SVG/inspection.svg";
import { ReactComponent as DropdownIcon } from "../../../../../assets/single color icons - SVG/accordion closed.svg";
import { ReactComponent as DropDownOpen } from "../../../../../assets/single color icons - SVG/accordion open.svg";
import { ReactComponent as LockIcon } from '../../../../../assets/single color icons - SVG/password.svg'
import { ReactComponent as UpdateIcon} from '../../../../../assets/single color icons - SVG/resize.svg'
import "antd/dist/antd.css";
import "./ActivityCard.scss";
import "../../../../RepairList/RepairList.scss";
import './Dropdown.scss'
import { Button, Dropdown, Menu, Select, Table } from "antd";
import AddItem from "./AddItem";
import OverlayBox from "../../../../../shared/components/overlayBox";
import { ContainerData } from "../../../../../models/singlecontainer.model";
import { fetchActivityStatus, handleConfirm, toggleExpandRepairCard, toggleExpandedQuoteCard } from "../../../../../services/ContainersService/viewcontainer.service";

interface RepairFormData {
  uid: string;
  repairArea: string;
  damageArea: string;
  type: string;
  quantity: string;
  location: string;
  hours: number;
  labourCost: number;
  materialCost: number;
  totalCost: number;
  id: string
}

interface OptionMenuProps {
  onDelete: () => void;
  onUpdateComment: () => void;
  onUpdatePhoto: () => void;
}

const ActivityCard: React.FC<{
  UniqueID: string
  formType: string;
  formID: string;
  date: string;
  activityStatus: string;
  icon: React.ReactElement;
  expanded: boolean;
  toggleExpand?: () => void;
  expandedData?: ContainerData
}> = ({
  UniqueID,
  formType,
  formID,
  date,
  activityStatus,
  icon
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [addItem, setAddItem] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [updateActivityStatus, setUpdateActivityStatus] = useState("");
  const [expandedRepairFormData, setExpandedRepairFormData] = useState<RepairFormData>()
  const [expandedQuoteFormData, setExpandedQuoteFormData] = useState(null)
  const [expandedInspectionFormData, setExpandedInspectionFormData] = useState(null)
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBox, setShowBox] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = () => {
    setShowBox(!showBox);
  };

  const getBackgroundColor = () => {
    if (icon.type === QuoteIcon) {
      return "lightpurple";
    } else if (icon.type === RepairIcon) {
      return "lightyellow";
    } else if (icon.type === InspectionIcon) {
      return "lightblue";
    } else {
      return "";
    }
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleUpdateClick = () => {
    if (activityStatus !== "Select") {
      setSelectedOption(activityStatus); 
      setShowConfirmation(true);
    }
  }

  const columns = [
    {
      title: "Repair ID",
      dataIndex: "repairID",
      key: "repairID",
    },
    {
      title: "Repair Area",
      dataIndex: "repairArea",
      key: "repairArea",
    },
    {
      title: "Damage Area",
      dataIndex: "damageArea",
      key: "damageArea",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
    },
    {
      title: "Labour Cost",
      dataIndex: "labourCost",
      key: "labourCost",
    },
    {
      title: "Material Cost",
      dataIndex: "materialCost",
      key: "materialCost",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
    },
  ]

  const [activityStatuses, setActivityStatuses] = useState([])

  useEffect(()=> {
      const fetchData = async () => {
        try {
          const activitystatues = await fetchActivityStatus()
          setActivityStatuses(activitystatues)
        } catch (err) {}
      }
      fetchData()
  },[])

  const mapRepairDataToTableData = () => {
    if (expandedRepairFormData) {
      return [
        {
          repairID: expandedRepairFormData.uid,
          repairArea: expandedRepairFormData.repairArea,
          damageArea: expandedRepairFormData.damageArea,
          type: expandedRepairFormData.type,
          quantity: expandedRepairFormData.quantity,
          location: expandedRepairFormData.location,
          hours: expandedRepairFormData.hours,
          labourCost: expandedRepairFormData.labourCost,
          materialCost: expandedRepairFormData.materialCost,
          totalCost: expandedRepairFormData.totalCost,
        },
      ];
    }
    return [];
  };

const [data, setData] = useState(mapRepairDataToTableData());

useEffect(() => {
  setData(mapRepairDataToTableData());
}, [expandedRepairFormData]);

const OptionMenu: React.FC<OptionMenuProps> = ({ onDelete, onUpdateComment, onUpdatePhoto }) => {
    const menu = (
      <Menu>
        <Menu.Item key="updateComment" onClick={onUpdateComment}>
          Update Comment
        </Menu.Item>
        <Menu.Item key="updatePhoto" onClick={onUpdatePhoto}>
          Update Photo
        </Menu.Item>
        <Menu.Item key="delete" onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="option-menu">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </Dropdown>
      );
    };

  const formTypeClass =
    formType === "Quote Form"
      ? "form-type-quote"
      : formType === "Repair Form"
      ? "form-type-repair"
      : formType === "Inspection Form"
      ? "form-type-inspection"
      : "";

  const toggleExpandCard = () => {
    setIsExpanded(!isExpanded);
    toggleExpandRepairCard(UniqueID)
    toggleExpandedQuoteCard(UniqueID)
    .then((response)=> {
      setExpandedRepairFormData(response)
      setExpandedQuoteFormData(response)

    })
  };

  const toggleAddItem = () => {
    setAddItem(!addItem);
  };

const confirmHandler = async () => {
  try {
    await handleConfirm(UniqueID, selectedOption, setShowConfirmation);
  } catch (error) {
  }
};

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div
      className={`activity-card ${formTypeClass} ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <div
        className={`card-header ${isExpanded ? "expanded-header" : ""}`}
        onClick={toggleExpandCard}
      >
        <div className="details-flex">
          <div className={`icon-background ${getBackgroundColor()}`}>
            <div className="card-icon">{icon} </div>
          </div>
          <div className="card-details">
            <div className="form-type">{formType}</div>
            <div className="form-id">{formID}</div>
          </div>
          <div className="date">{date}</div>
        </div>

        <div className={`activity-status ${activityStatus === "draft" ? "draft" : ""}`}> {activityStatus === "repair" ? "repair" : activityStatus}</div>
        <div className="dropdown-icon">
          {isExpanded ? (
            <DropDownOpen width={10} />
          ) : (
            <DropdownIcon width={10} />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="expanded-content">
          <div className="expanded-header">
            <div className="header_first">
              <div>
                <Button>View Timeline</Button>
              </div>
              <div className="dropdown-user-info">
                <p>Current User</p>
                <p>James Vasanth <span className="dropdown-lock-icon">&nbsp;<LockIcon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} width={10}/>{showTooltip && `${<p>Unlock</p>}`}</span></p>
              </div>
            </div>
            <div className="header_second">
              <div><Button onClick={()=>toggleAddItem()}>Add Item</Button></div>
              <div className="select-container">
                <Button>Status</Button>
                <Select
                 onChange={(value) => setUpdateActivityStatus(value)}
                  value={updateActivityStatus}
                  defaultValue="Select"
                  style={{ width: 150 }}
                  className="activity-select"
                  options={activityStatuses.map(option => ({
                    label: option,
                    value: option
                  }))}
                />
              </div>
              <Button className="submit-button update-submit-button" onClick={handleUpdateClick}>Update</Button>
            </div>
            </div>
            <Table
            columns={[
              ...columns,
              {
                key: "options",
                render: (text, record, index) => (
                  <OptionMenu
                    onDelete={() =>{}}
                    onUpdateComment={() =>{}}
                    onUpdatePhoto={() =>{}}
                  />
                ),
              },
            ]}
            dataSource={data}
            pagination={false}
          />
        </div>
      )}

      {showConfirmation && (
  <OverlayBox maxWidth="400px" minHeight="330px" onClose={()=> {}}>
    <div className="overlay-box-update">
     
      <div className="delete-confirmation-box">
              <div className="delete-text-icon update-text">
                <UpdateIcon/>
                <p>Are you sure to change the status?</p>
                {expandedRepairFormData.uid &&
                <p>{formType} - {expandedRepairFormData.uid} will be moved to <span className="update-activity-text">{updateActivityStatus}</span> status</p>}
              </div>
              <div className="delete-confirmation-buttons">
              <button onClick={()=>confirmHandler}>Confirm</button>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={()=>handleConfirm(expandedRepairFormData.id, updateActivityStatus, expandedRepairFormData.uid)}>Confirm</button>
              </div>
            </div>
    
    </div>
  </OverlayBox>
)}

          {addItem && (
            <div className="overlay">
              <div className="overlay-content">
                <AddItem
                  onclose={() => {
                    setAddItem
                    (false);
                  }}
                />
              </div>
            </div>
          )}
    </div>
  );
};

export default ActivityCard;
