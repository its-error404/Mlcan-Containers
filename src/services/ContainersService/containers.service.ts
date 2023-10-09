import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { AllContainersData } from '../../models/Containers.model';
import { ContainerData } from '../../models/singlecontainer.model';
import { notification } from 'antd';
import { deserialize } from 'serializr';

export const getContainersData = async () => {
  let totalEntries = 0
  try {
    const response = await axiosInstance.get(ApiRoutes.CONTAINERS)
    const jsonData = response.data.data.docs;
    const deserializedData = deserialize(AllContainersData, { docs: jsonData  });
    if (Array.isArray(deserializedData?.docs)) {
      totalEntries = deserializedData.docs.length;
    }
    return { deserializedData, totalEntries }
  } catch (err) {
    console.log(err)
  }
}

const workingLink = `${ApiRoutes.CONTAINERS}/6496b4d51725b1f902152f0b`

export const getWorkingContainer = async () => {
  try {
    const response = await axiosInstance.get(workingLink);
    const jsonData = response.data.data;
    const containerInstance = deserialize(ContainerData, jsonData);
    return containerInstance
  } catch (err) {
    console.error("Error fetching data:", err); 
    throw err;
  }
};

export const addContainerRequest = async (values: ContainerData) => {
  try {
      const response = await axiosInstance.post(ApiRoutes.CONTAINERS, values)

      if(response) {
          notification.success({
              message: "Container Added Successfully !",
              description: "Check your container details for more information !",
              className: "custom-notification-placement",
            });
            setTimeout(() => {
              notification.destroy();
            }, 3000);
      }
      else {
          notification.error({
              message: "There was a error in adding the Container !",
              description: "Check your container details for more information !",
              className: "custom-notification-placement",
            });
       }
     
   } catch (error) {
      console.log(error)
  }
}

export const addItemRequest = async (values: ContainerData) => {
  try {
      const response = await axiosInstance.post(ApiRoutes.REP_ITEMS, values)

      if(response.status) {
          notification.success({
              message: "Item Added Successfully !",
              description: "Check your Item details for more information !",
              className: "custom-notification-placement",
            });
            setTimeout(() => {
              notification.destroy();
            }, 3000);
      }
      else {
          notification.error({
              message: "There was a error in adding the Item !",
              description: "Check your Item details for more information !",
              className: "custom-notification-placement",
            });
       }
     
   } catch (error) {
      console.log(error)
  }
}

export const editContainerRequest = async (values: ContainerData, id:string) => {
  try {
      const response = await axiosInstance.put(`${ApiRoutes.CONTAINERS}/${id}`, values)
      if(response) {
          notification.success({
              message: "Container Edited Successfully !",
              description: "Check your container details for more information !",
              className: "custom-notification-placement",
            });
            setTimeout(() => {
              notification.destroy();
            }, 3000);
      }
      else {
          notification.error({
              message: "There was a error in Editing the Container !",
              description: "Check your container details for more information !",
              className: "custom-notification-placement",
            });
       }
     
   } catch (error) {
      console.log(error)
  }
}

//edit container meta

export const fetchEditContainerMeta = async () => {
  try  {
    const [contLengths, contHeights, contYards, contTypes, customers ] = await Promise.all([axiosInstance.get(ApiRoutes.LENGTH), axiosInstance.get(ApiRoutes.HEIGHT), axiosInstance.get(ApiRoutes.YARDS), axiosInstance.get(ApiRoutes.CON_TYPES), axiosInstance.get(ApiRoutes.CUSTOMERS)])

    const contLengthData = contLengths.data.data.values
    const contHeightsData = contHeights.data.data.values
    const contTypesData = contTypes.data.data.values
    const contYardsData = contYards.data.data.values
    const customersData = customers.data.data.docs
    const customerNames = customersData.map(entry => entry.name);
    return { contLengthData, contHeightsData, contTypesData, contYardsData, customerNames }
  } catch (err) {throw err}
}
