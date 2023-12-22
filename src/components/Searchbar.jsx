import { Chip, Input, Popover } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import classes from "../styles/Styles.module.css";
import { useSelector } from "react-redux";
import { searchTasksAPI } from "../utils/commons";
import { setFilteredPhases } from "../features/common/dataSlice";
import { useDispatch } from "react-redux";
import { setIsFiltered } from "../features/common/uiSlice";
import { debounce } from "lodash";

const Searchbar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const phases = useSelector((state) => state.data.phases);

  const [selectedPhase, setSelectedPhase] = useState([]);
  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();

  const popoverRef = useRef(null);
  const searchInputRef = useRef(null);

  // popover
  const handleOutsideClick = (event) => {
    // Close the popover if it's open and the click is outside the popover content
    if (
      isPopoverOpen &&
      !popoverRef?.current?.contains(event.target) &&
      !searchInputRef?.current?.contains(event.target)
    ) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for outside click when the Popover is open
    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup the event listener when the component unmounts or the Popover closes
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPopoverOpen]);

  // drop arrow icon
  const renderIcon = () => {
    return isPopoverOpen ? (
      <IconChevronUp
        className={classes.advancedSearchIcon}
        size={16}
        onClick={() => setIsPopoverOpen(false)}
      />
    ) : (
      <IconChevronDown
        className={classes.advancedSearchIcon}
        size={16}
        onClick={() => setIsPopoverOpen(true)}
      />
    );
  };

  const handleSearch = (
    { selectedPhase, searchString } = { selectedPhase: [], searchString: "" }
  ) => {
    if (selectedPhase?.length > 0 || searchString) {
      searchTasksAPI({
        phaseId: selectedPhase.join(","),
        title: searchString,
      })
        .then((data) => {
          dispatch(setFilteredPhases(data));
          dispatch(setIsFiltered(true));
        })
        .catch((error) => {
          console.error("Error while searching", error);
        });
    } else {
      dispatch(setIsFiltered(false));
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  useEffect(() => {
    debouncedSearch({ selectedPhase, searchString });
  }, [selectedPhase, searchString]);

  return (
    <Popover
      opened={isPopoverOpen}
      width="target"
      position="bottom"
      offset={0}
      shadow="md"
      withinPortal={false}
    >
      <Popover.Target>
        <StyledInput
          rightSectionPointerEvents="all"
          label="Search"
          placeholder="Search"
          size="sm"
          rightSection={renderIcon()}
          ref={searchInputRef}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </Popover.Target>
      <Popover.Dropdown ref={popoverRef}>
        <AdvancedSearchWrapper>
          <Chip.Group
            multiple
            value={selectedPhase}
            onChange={setSelectedPhase}
          >
            {phases.map((phase) => {
              return (
                <Chip
                  size="xs"
                  key={phase.id}
                  value={phase.id}
                  color={phase.color}
                  onChange={() => {}}
                >
                  {phase.title}
                </Chip>
              );
            })}
          </Chip.Group>
        </AdvancedSearchWrapper>
      </Popover.Dropdown>
    </Popover>
  );
};

const StyledInput = styled(Input)`
  width: 20rem;
  margin-right: 1rem;
`;

const AdvancedSearchWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export default Searchbar;
