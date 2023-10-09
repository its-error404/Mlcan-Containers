import { deserialize } from 'serializr';
import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { CommentsData } from '../../models/comments.model';
import { notification } from 'antd';

export const fetchActivityData = async () => {
  
  const photoQuery = `64a63ed193c84f257a88415e`
  const photoURL = `${ApiRoutes.CONT_PHOTO}/${photoQuery}`;
  const inspectionForm = `${ApiRoutes.INSPECTION_FORM}`;
  const quoteForm = `${ApiRoutes.QUOTE_FORM}`
  const repairForm = `${ApiRoutes.REPAIR_FORM}`;

  try {
    const photoResponse = await axiosInstance.get(photoURL)
    const inspectionFormResponse = await axiosInstance.get(inspectionForm)
    const quoteFormResponse = await axiosInstance.get(quoteForm)
    const repairFormResponse = await axiosInstance.get(repairForm)

    if (photoResponse && quoteFormResponse && inspectionFormResponse && repairFormResponse) {
      const photoJsonData = photoResponse.data.data
      const inspectionJsonData = inspectionFormResponse.data.data
      const quoteJsonData = quoteFormResponse.data.data
      const repairFormJsonData = repairFormResponse.data.data
      return {photoJsonData, inspectionJsonData, quoteJsonData, repairFormJsonData}

  } else {
    throw new Error ("Request Failed !")
  }
  } catch (error) {
    throw error;
  }
};

export const fetchCommentsData = async () => {
  const query = `{"container": "64a53e59c637122f8ba5421e"}`
  const URL = `${ApiRoutes.COMMENTS}?query=${query}`

  try {
    const response = await axiosInstance.get(URL)

    if (response.status) {
        const jsonData = response.data.data
        const commentsData: CommentsData = deserialize(CommentsData, jsonData);
        return commentsData
  } else {
    throw new Error ("Request Failed !")
  }
} catch (err) {
    console.log(err)
    return []
};
}

export const fetchLogData = async () => {
    const query = `{"container": "64a53e59c637122f8ba5421e"}`
  const URL = `${ApiRoutes.COMMENTS}?query=${query}`

  try {
    const response = await axiosInstance.get(URL)

    if (response) {
        const jsonData = response.data.data
        const commentsData: CommentsData = deserialize(CommentsData, jsonData);
        return commentsData
  } else {
    throw new Error ("Request Failed !")
  }
} catch (err) {
    console.log(err)
    return []
};
};

//Repair form call

export const toggleExpandRepairCard = async (uniqueID: string) => {
  try {
    const response = await axiosInstance.get(`${ApiRoutes.REPAIR_FORM}/${uniqueID}`);
    return response.data.data.form
  } catch (error) {
    console.error("Error fetching card details:", error);
  }
};

export const toggleExpandedQuoteCard = async (uniqueID: string) => {
  try {
    const response = await axiosInstance.get(`${ApiRoutes.QUOTE_FORM}/&${uniqueID}`)
    return response.data.data.form
  } catch (err) {}
}

export const containerItemsMeta = async () => {
  try {
    const [ repArea, dmgArea, itemTypes, quantity ] = await Promise.all([axiosInstance.get(ApiRoutes.LENGTH), axiosInstance.get(ApiRoutes.HEIGHT), axiosInstance.get(ApiRoutes.YARDS), axiosInstance.get(ApiRoutes.CON_TYPES), axiosInstance.get(ApiRoutes.CUSTOMERS)])

    const repAreaData = repArea.data.data.values
    const dmgAreaData = dmgArea.data.data.values
    const itemTypesData = itemTypes.data.data.values
    const quantityData = quantity.data.data.values

    return { repAreaData, dmgAreaData, itemTypesData, quantityData }
  } catch (err) {throw err}
}

export const fetchActivityStatus = async () => {
  try {
    const activityStatus = await axiosInstance.get(ApiRoutes.ACTIVITY_STATUS)
    return activityStatus.data.data.values
  } catch (err) {}
}

export const addComment = async (commentText: string) => {
  try {
    const response = await axiosInstance.post(ApiRoutes.COMMENTS, {comment: commentText});
    notification.success({
      message: "Comment Added Successfully",
      description: "Comment",
      className: "custom-notification-placement",
    });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const upgradeRepairForm = async (UniqueID, selectedOption) => {
  try {
    const response = await axiosInstance.post(
      `${ApiRoutes.REPAIR_FORM}/upgrade/${UniqueID}`,
      {
        option: selectedOption,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleConfirm = async (UniqueID, selectedOption, setShowConfirmation) => {
  try {
    
    const response = await upgradeRepairForm(UniqueID, selectedOption);

    notification.success({
      message: "Updated Successfully!",
      className: "custom-notification-placement",
    });

    setShowConfirmation(false);

    return response;
  } catch (error) {
    setShowConfirmation(false);
    notification.error({
      message: "Update Failed!",
      className: "custom-notification-placement",
    });
    console.error("Error updating status:", error);

    throw error;
  }
};
