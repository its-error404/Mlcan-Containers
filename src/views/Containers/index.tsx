import React, { useEffect, useRef, useState } from "react";
import "./Containers.scss";
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import { ReactComponent as SearchIcon } from "../../assets/single color icons - SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/single color icons - SVG/filter.svg";
import { Button, DatePicker, Table } from "antd";
import { getContainersData } from "../../services/ContainersService/containers.service";
import AddContainer from "./AddContainer";
import { Link } from "react-router-dom";
import "../../styles/_@antOverrides.scss";
import { AllContainersData,ContainersData,} from "../../models/Containers.model";
import "antd/dist/antd.css";
import { formatDate } from "../../shared/utils/formatDate";
import ExportMenu from "../../shared/components/ExportMenu";
import { TableProps } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";
import FilterMenu from "../../shared/components/ContainerFilterMenu";
import ApproveBox from "../../shared/components/ApproveBox";

const AllContainers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<ContainersData[]>([]);
  const [searchData, setSearchData] = useState("");
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [addContainer, setAddContainer] = useState<boolean>(false);
  const [approveBox, setApproveBox] = useState(false)
  const [activeSection, setActiveSection] = useState("All");
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [activityData, setActivityData] = useState("");
  const [statusData, setStatusData] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [yardData, setYardData] = useState("");
  const [dateData, setDateData] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<ContainersData[]>([]);
  const [allContainersData, setContainersData] = useState<AllContainersData | null>(null);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [displayedEntries, setDisplayedEntries] = useState<number>(totalEntries ?? 0);
  const [showActivityUidColumn, setShowActivityUidColumn] = useState(false);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<ContainersData>>({});

  const handleChange: TableProps<ContainersData>['onChange'] = (pagination, filters, sorter) => {
    if (Array.isArray(sorter)) {
      
    } else if (sorter && sorter.field) {
      setSortedInfo(sorter as SorterResult<ContainersData>);
  
      const newFilteredData = [...filteredEntries];
      newFilteredData.sort((a, b) => {
        if (sorter.order === 'ascend') {
          return a[sorter.field].localeCompare(b[sorter.field]);
        } else {
          return b[sorter.field].localeCompare(a[sorter.field]);
        }
      });
      setFilteredEntries(newFilteredData);
    }
  };
  
  useEffect(() => {
    refreshData();
  }, []);

  const toggleAddContainer = () => {
    setAddContainer(!addContainer);
  };

  const filterContainers = (section: string, searchQuery: string) => {
    if (!allContainersData?.docs) {
      return [];
    }

    const containers = allContainersData.docs as ContainersData[];

    let filteredData = containers.filter((doc) => {
      const searchMatches = doc.uid
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      switch (section) {
        case "All":
          return searchMatches;
        case "Draft":
          return doc.activityStatus === "draft" && searchMatches;
        case "Admin Review Pending":
          return doc.activityStatus === "billing" && searchMatches;
        case "Pending Customer Approval":
          return doc.activityStatus === "pending" && searchMatches;
        case "Quotes Approved by Customers":
          return doc.activityStatus === "approved" && searchMatches;
        default:
          return false;
      }
    });

    return filteredData;
  };

  const handleSectionClick = (section: string) => {
    const newIndex = sections.indexOf(section);
    setSectionIndex(newIndex);
    const sectionFilteredData = filterContainers(section, searchData);
    setFilteredEntries(sectionFilteredData);
    setDisplayedEntries(sectionFilteredData.length);
    setActiveSection(section);
    setShowActivityUidColumn(section === "Draft");
  };


  const getRowClassName = (record: ContainersData, index: number) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };
  const startIndex = Math.min(displayedEntries, totalEntries) > 0 ? 1 : 0;
  const endIndex = Math.min(displayedEntries, totalEntries);

  const applyFilters = () => {
    const filteredData = filterContainers(activeSection, searchData).filter(
      (doc) => {
        const ActivityMatches =
          activityData === "" || doc.activityType === activityData;
        const statusMatches =
          statusData === "" || doc.activityStatus === statusData;
        const yardMatches = yardData === "" || doc.yard === yardData;
        const customerMatches =
          customerData === "" || doc.customerName === customerData;
        const dateMatches =
          dateData === "" || formatDate(doc.activityDate) === dateData;

        return (
          ActivityMatches &&
          customerMatches &&
          yardMatches &&
          statusMatches &&
          dateMatches
        );
      }
    );

    return filteredData;
  };

  const handleApplyFilters = () => {
    const newFilteredData = applyFilters();
    setFilteredEntries(newFilteredData);
    setDisplayedEntries(newFilteredData.length);
    setFilterMenu(false);
  };


  const handleResetFilters = () => {
    setActivityData("");
    setDateData("");
    setYardData("");
    setStatusData("");
    setCustomerData("");
    setSearchData("");

    setFilteredEntries(searchResults);
    setDisplayedEntries(searchResults.length);
    setFilterMenu(false);
  };

  const refreshData = () => {
    const fetchData = async () => {
      try {
        const data = await getContainersData();
        if (data) {
          setContainersData(data.deserializedData);
          setSearchResults(
            (data.deserializedData.docs || []) as ContainersData[]
          );
          setFilteredEntries(
            (data.deserializedData.docs || []) as ContainersData[]
          );
          setTotalEntries(data.totalEntries || 0);
          setDisplayedEntries(data.totalEntries || 0);
        }
      } catch (e) {}
    };
    fetchData();
  };

  const sections = ["All","Draft","Admin Review Pending","Pending Customer Approval","Quotes Approved by Customers",];
  const baseColumns = [
    {
      title: "Container Number",
      dataIndex: "uid",
      key: "uid",
      render: (text: string, record: ContainersData) => (
        <Link to={`/containers/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: <div className="sort-column">Yard</div>,
      dataIndex: "yard",
      key: "yard",
      render: (text: string) => text,
      sorter: (a: ContainersData, b: ContainersData) => {
        if (a.yard && b.yard) {
          return a.yard.length - b.yard.length;
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === "yard" ? sortedInfo.order : null,
    },
    {
      title: <div className="sort-column">Customer</div>,
      dataIndex: "customerName",
      key: "customerName",
      render: (text: string) => text || "N/A",
      sorter: (a: ContainersData, b: ContainersData) => {
        if (a.customerName && b.customerName) {
          return a.customerName.length - b.customerName.length;
        }
        return 0;
      },
      sortOrder:
        sortedInfo.columnKey === "customerName" ? sortedInfo.order : null,
    },
    {
      title: <div className="sort-column">Owner Name</div>,
      dataIndex: "owner",
      key: "owner",
      render: (text: string) => text || "N/A",
      sorter: (a: ContainersData, b: ContainersData) => {
        if (a.owner && b.owner) {
          return a.owner.length - b.owner.length;
        }
        return 0;
      },
      sortOrder: sortedInfo.columnKey === "owner" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: (
        <div className="sort-column">
          {sectionIndex === 1 ? "Activity" : "Current Activity"}
        </div>
      ),
      dataIndex: "activityType",
      key: "activityType",
      render: (text: string) =>
        text
          ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
          : "N/A",
      sorter: (a: ContainersData, b: ContainersData) => {
        const activityTypeA = a.activityType || "";
        const activityTypeB = b.activityType || "";
        return activityTypeA.localeCompare(activityTypeB);
      },
      sortOrder:
        sortedInfo.columnKey === "activityType" ? sortedInfo.order : null,
      ellipsis: true,
    },
    sectionIndex === 1
    ? {
        title: (
          <div className="sort-column">Activity ID</div>
        ),
        dataIndex: "activityUid",
        key: "activityUid",
        render: (text: string) =>
          showActivityUidColumn ? text || "N/A" : null,
        sorter: (a: ContainersData, b: ContainersData) =>
          a.activityUid.length - b.activityUid.length,
        sortOrder: sortedInfo.columnKey === "activityUid" ? sortedInfo.order : null,
        ellipsis: true,
      }
    : null,
    {
      title: <div className="sort-column">Activity Date</div>,
      dataIndex: "activityDate",
      key: "activityDate",
      render: (text: string | undefined) => (text ? formatDate(text) : "N/A"),
      sorter: (a: ContainersData, b: ContainersData) => {
        const activityDateA = a.activityDate || "";
        const activityDateB = b.activityDate || "";
        return activityDateA.localeCompare(activityDateB)
      },
      sortOrder:
        sortedInfo.columnKey === "activityDate" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: <div className="sort-column">Status</div>,
      dataIndex: "activityStatus",
      key: "activityStatus",
      render: (text: string) => {
        let displayedText = "N/A";
        if (text === "billing") {
          displayedText = "Ready for Billing";
        } else if (text === "draft") {
          displayedText = "Quote Draft";
        }

        return (
          <div
            className={`activity-text ${text === "billing"
              ? "billing-style"
              : text === "draft"
                ? "draft-style"
                : "default-style"
              }`}
          >
            {displayedText}
          </div>
        );
      },
      sorter: (a: ContainersData, b: ContainersData) => {
        const activityStatusA = a.activityStatus || "";
        const activityStatusB = b.activityStatus || "";
        return activityStatusA.localeCompare(activityStatusB);
      },
      sortOrder:
        sortedInfo.columnKey === "activityStatus" ? sortedInfo.order : null,
    },
  ];

  const dynamicColumns = [];

  if (sectionIndex === 1) {
    dynamicColumns.push({
      title: <div className="sort-column">Activity ID</div>,
      dataIndex: "activityUid",
      key: "activityUid",
      render: (text: string) => (showActivityUidColumn ? text || "N/A" : null),
      sorter: (a: ContainersData, b: ContainersData) => {
        if (a.activityUid && b.activityUid) {
          return a.activityUid.length - b.activityUid.length;
        }
        return 0;
      },
      sortOrder:
        sortedInfo.columnKey === "activityUid" ? sortedInfo.order : null,
      ellipsis: true,
    });
  }
  baseColumns.splice(5, 0, ...dynamicColumns);
  const columns = baseColumns.filter(Boolean);

  let filterMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (!filterMenuRef.current?.contains(e.target)) {
        setFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const SearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchQuery = e.target.value;
    setSearchData(searchQuery);

    const filteredData = applyFilters();

    const filteredSearchData = filteredData.filter((doc) =>
      doc.uid?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredSearchData);
    setFilteredEntries(filteredSearchData);
    setDisplayedEntries(filteredSearchData.length);

    if (searchQuery === "") {
      refreshData();
    }
  };

  const handleClearSearch = () => {
    setSearchData("");
    refreshData();
    const newFilteredData = applyFilters();
    setFilteredEntries(newFilteredData);
    setDisplayedEntries(newFilteredData.length);
  };

  return (
    <div className="main">
      <div className="all-containers">
        <Sidebar />
        <div className="containers-section">
          <div className="containers-header">
            <h1>Containers</h1>
            <PlusIcon
              width={25}
              className="plus-icon"
              onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                toggleAddContainer()
              }
            />
          </div>

          {addContainer && (
            <div className="overlay">
              <div className="overlay-content">
                <AddContainer
                  onclose={() => {
                    setAddContainer(false);
                  }}
                />
              </div>
            </div>
          )}

          <div className="options">
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

          <div className="container-details">
            <div className="search-container">
              <span className="search-icon">
                <SearchIcon width={17} />
              </span>
              <input type="text" className="search-box" placeholder="Search container by number" onChange={SearchChange} value={searchData}></input>
              {searchData && (
                <Button className="clear-search" onClick={handleClearSearch}>
                  Clear
                </Button>
              )}
              <div ref={filterMenuRef}>
                <div
                  className="filters-container container-filter-container"
                  onClick={() => {
                    setFilterMenu(!filterMenu);
                  }}
                >
                  <button
                    className={`repair-filter-button ${
                      filterMenu ? "change-button" : ""
                    }`}
                  >
                    <span className="filter-icon">
                      <FilterIcon width={20} />
                    </span>
                    Filters
                  </button>
                  <FilterMenu
                    filterMenu={filterMenu}
                    setFilterMenu={setFilterMenu}
                    setDateData={setDateData}
                    dateData={dateData}
                    setActivityData={setActivityData}
                    activityData={activityData}
                    setStatusData={setStatusData}
                    statusData={statusData}
                    setYardData={setYardData}
                    yardData={yardData}
                    setCustomerData={setCustomerData}
                    customerData={customerData}
                    handleResetFilters={handleResetFilters}
                    handleApplyFilters={handleApplyFilters}
                  />
                </div>
              </div>

              {approveBox && (
            <div className="overlay">
              <div className="overlay-content">
                <ApproveBox
                  onclose={() => {
                    setApproveBox(false);
                  }}
                />
              </div>
            </div>
          )}

              {activeSection === "Pending Customer Approval" && (
                <div className="container-export-menu">
                  <ExportMenu />
                  <Button className="bulk-upload-button approve-button" onClick={()=>setApproveBox(!approveBox)}>Approve Quote</Button>
                </div>
              )}
            </div>

            <div className="container-box__container">
              <Table
                columns={columns}
                dataSource={filteredEntries}
                rowKey="uid"
                className="container-table"
                rowClassName={getRowClassName}
                pagination={false}
                onChange={handleChange}
                {...(sectionIndex === 3 ? { rowSelection } : {})}
              />
            </div>
            <p className="total-records">
              Showing{" "}
              <span className="record-range">
                {startIndex} - {endIndex} &nbsp;
              </span>
              of&nbsp; <span className="total-range">{totalEntries}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllContainers;
