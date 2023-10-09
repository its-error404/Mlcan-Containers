import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import "./ViewContainer.scss";
import { getWorkingContainer } from "../../../services/ContainersService/containers.service";
import { Container, ContainerData } from "../../../models/singlecontainer.model";
import { ReactComponent as BackIcon } from "../../../assets/single color icons - SVG/back.svg";
import { ReactComponent as EditIcon } from "../../../assets/single color icons - SVG/edit.svg";
import { ReactComponent as NextIcon } from "../../../assets/Multicolor icons - SVG/next.svg";
import { ReactComponent as PrevIcon } from "../../../assets/Multicolor icons - SVG/previous.svg";

import ActivitySection from "./Activity";
import Comments from "./Comments";
import Log from "./Log";
import {
  fetchActivityData,
  fetchCommentsData,
  fetchLogData,
} from "../../../services/ContainersService/viewcontainer.service";
import EditContainer from "../EditContainer";

const ViewContainer: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [containerData, setContainerData] = useState<ContainerData | null>(null);
  const [activeSection, setActiveSection] = useState("Activity");
  const [, setSectionIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [editContainer, setEditContainer] = useState<Container | null>(null)
  const [editContainerVisible, setEditContainerVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getWorkingContainer();
      setContainerData(response);
    } catch (error) {
      console.error("Error fetching container data:", error);
      setContainerData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEditClick = (container: Container | null) => {
    if (container) {
      setEditContainer(container);
      setEditContainerVisible(true)
    }
  };

  const sections = ["Activity", "Comments", "Log"];

  const handleSectionClick = async (section: string) => {
    const newIndex = sections.indexOf(section);
    setSectionIndex(newIndex);
    setActiveSection(section);

    if (section === "Activity") {
      if (id) {
        await fetchActivityData();
      }
    } else if (section === "Comments") {
      if (id) {
        await fetchCommentsData();
      }
    } else if (section === "Log") {
      if (id) {
        await fetchLogData();
      }
    }
  };

  return (
    <div className="view-container">
      <Sidebar />
      <div className="page-content">
        <div className="go-to-containers">
          <Link to="/containers">
            <BackIcon width={15} />
            &emsp;Containers
          </Link>
        </div>
        <div className="container-header">
          <div className="container-header__first">
            <h2>hi</h2>
            {containerData && containerData.container && (
              <>
               
                <h1>{containerData.container.uid}</h1>
                <EditIcon width={15} onClick={() => handleEditClick(containerData.container)} />
                
              </>
            )}
          </div>
          <div className="container-header__second">
            <p>1 of 94 </p>
            <PrevIcon width={30} />
            <NextIcon width={30} />
          </div>
        </div>
      
        <div className="container-headlines">
          <p>Yard name</p>
          <p>Customer</p>
          <p>Owner name</p>
          <p>Submitter Initials</p>
          <p>Length</p>
          <p>Height</p>
          <p>Container Type</p>
          <p>Manufacture Year</p>
        </div>
        <div className="container-data" >
        {loading ? (
          <p>Loading...</p>
        ) : (
          containerData && containerData.container && (
            <>
              <p>{containerData.container.yard}</p>
              <p>{containerData.container.customer.name}</p>
              <p> {containerData.container.owner}</p>
              <p>{containerData.container.submitter}</p>
              <p>{containerData.container.length}</p>
              <p>{containerData.container.height}</p>
              <p>{containerData.container.type}</p>
              <p> {containerData.container.year}</p>
            </>
          )
        )}
      </div>
    {editContainerVisible && (
      <div className="overlay">
      <div className="overlay-content">
        <EditContainer
          data={editContainer}
          id={id} 
          onclose={() => setEditContainerVisible(false)}
        />
        </div>
        </div>
      )}

        <div className="options container-options">
          {sections.map((section, index) => (
            <p
              key={section}
              onClick={() => handleSectionClick(section)}
              className={activeSection === section ? "active-section" : ""}
            >
              {section}
            </p>
          ))}
        </div>
        <div className="section-content">
          {activeSection === "Activity" && <ActivitySection />}
          {activeSection === "Comments" && <Comments />}
          {activeSection === "Log" && <Log />}
        </div>
      </div>
    </div>
  );
};

export default ViewContainer;
