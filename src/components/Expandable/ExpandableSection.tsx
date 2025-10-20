import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineAdd } from 'react-icons/md';
import {Button} from "@chakra-ui/react";
import './ExpandableSection.scss'

interface PopupProps {
  title: String;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  buttonVisible: boolean;
  contentButton?: String;
  onButtonAdd?: () => void;
}

const Expandable: React.FC<PopupProps> =  ({ title, children, defaultExpanded = false, contentButton, onButtonAdd, buttonVisible }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isVisible] = useState(buttonVisible);

  return (
    <div className="expandable">
      <div className="expandable-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className='title-header'>
            <h3>{title}</h3>
            <MdKeyboardArrowDown className={`arrow ${isExpanded ? 'expanded' : ''}`} />
        </div>
        <Button className={`btn-nova-pesquisa ${isVisible ? '' : 'invisible'}`} onClick={onButtonAdd}>
            <MdOutlineAdd />
            {contentButton}
        </Button>
      </div>
      
      <div className={`expandable-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="expandable-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Expandable;