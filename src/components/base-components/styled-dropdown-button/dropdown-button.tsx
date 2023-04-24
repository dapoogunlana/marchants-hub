import Dropdown from 'react-bootstrap/Dropdown';

function DropdownStyledButton(props: any) {

  // // The object you pass in looks something like this
  // const buttonProp = {
  //   name: 'Any Name',
  //   variant: 'primary',
  //   action: {
  //     fin: () => console.log('Completed'),
  //     started: () => console.log('started'),
  //   }
  // };
  // <DropdownStyledButton data={buttonProp} />

  const formatter = () => {
    const formatedActions = [];
    const actions = props.data.action;
    for(const item in actions) {
      if(item && actions[item]) {
        formatedActions.push({
          name: item,
          action: item,
        });
      }
    }
    return formatedActions;
  }

  return (
    props.data && <Dropdown>
      <Dropdown.Toggle variant={props.data.variant || 'success'} style={props.style} className={formatter().length === 0 ? ' unclickable' : ''} id="dropdown-basic">
        {props.data.name}
      </Dropdown.Toggle>

      {
        formatter().length > 0 &&
        <Dropdown.Menu>
        {formatter().map((item, index) => (
          <Dropdown.Item key={index} onClick={props.data.action[item.name]}>{item.name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
      }
    </Dropdown>
  );
}

export default DropdownStyledButton;