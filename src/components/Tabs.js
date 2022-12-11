import React, { Component } from 'react';
import Tab from './Tab'
import './Tabs.css'

class Tabs extends Component {  
    constructor(props) {
      super(props);
  
      this.state = {
        activeTab: this.props.children[0].props.label,
      };
    }
  
    onClickTabItem = (tab) => {
      this.setState({ activeTab: tab });
    }

    render() {
        const {
          onClickTabItem,
          props: {
            children,
          },
          state: {
            activeTab,
          }
        } = this;
    
        return (
          <div className="tabs">
            <div className="tab-list">
                {children.map((child) => 
                {
                    const { label, path, icon} = child.props;
                    if (label === '_separator'){
                        return(<div className='Separator' />)
                    }
                    return (
                    <Tab
                        activeTab={activeTab}
                        key={label}
                        label={label}
                        onClick={onClickTabItem}
                        path = {path}
                        icon = {icon}
                    />
                    );
                })
                }
            </div>
          </div>
        );
    }
    
}

export default Tabs;