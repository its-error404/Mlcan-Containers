import React from "react";
import OverlayBox from "../../../shared/components/overlayBox";
import {ReactComponent as UploadIcon } from '../../../assets/single color icons - SVG/upload photo.svg'
import {ReactComponent as CloseIcon } from '../../../assets/single color icons - SVG/close.svg'
import {ReactComponent as AlertIcon } from '../../../assets/Multicolor icons - SVG/alert.svg'
import './BulkUpload.scss'
import { Upload, notification } from "antd";

interface BulkUploadComponentProps {
  onClose: () => void;
}

const onUpload = (onClose) => {
  notification.success({
    message: "Upload Successful !",
    description: "Check the Table for more information !",
    className: "custom-notification-placement",
  });
  setTimeout(() => {
    notification.destroy();
  }, 3000);

  onClose()
}

const BulkUploadComponent: React.FC<BulkUploadComponentProps> = ({ onClose }) => {
  return (
    <OverlayBox onClose={onClose} minHeight="450px">
      <div className="bulk-upload-box">
        <div className="header">
            <div className="close-flex">
                <h2>Bulk Upload repair list</h2>
                <CloseIcon width={20} onClick={onClose} className="bulk-close"/>
            </div>
            <p><span><AlertIcon width={20}/></span>&emsp;Append the new list with existing list and upload</p>
            <p>Upload .csv/ .xlsv file</p>
        </div>
        <div className="upload-box">
            <UploadIcon width={40} className="upload-icon"/>
            <h3>Drag & Drop to upload</h3>
            <Upload className="file-upload">or browse file </Upload>
        </div>
        <div className="delete-confirmation-buttons upload-buttons">
                <button onClick={onClose}>Cancel</button>
                <button onClick={()=>onUpload(onClose)}>Proceed</button>
        </div>
        
      </div>
    </OverlayBox>
  );
};

export default BulkUploadComponent;
