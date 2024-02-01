import React from 'react';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const divStyle = {
    width: '35%',
    height: '85%', // Adjust the height as needed
    backgroundColor: 'lightblue',
    textAlign: 'center',
  };

  const buttonStyle = {
    marginTop: '20px', // Adjust the margin-top as needed
    width:'100px'
  };

  const hrStyle = {
    width: '300px',
    height: '3px',
    backgroundColor: 'white',
    border: 'none', // Remove the default border
    margin: '10px auto', // Adjust margin as needed
  };
  const navigate = useNavigate();

  const GoToLogin = () => {
    // Navigate to another page when the button is clicked
    navigate('/login');
  };
  const GoToSIgnUp = () => {
    // Navigate to another page when the button is clicked
    navigate('/signup');
  };
  return (
    <div style={containerStyle}>
      <div style={divStyle}>
        <h1 className="Heading">
            Art of Plants
        </h1>
        <hr style={hrStyle} />
        <p className="Paragraph" style={{'width':'350px','margin':'0 auto'}}>
            lorem ipsum bal sal asdfasd sdfasdfasdf sda asdfsadfsad fasd fasfdadsf asdfasd
        </p>
        <div className='BtnLogin' >
        <button onClick={GoToLogin} className='btn btn-success' style={buttonStyle}>
          Log In
        </button>
        </div>
        <div className='BtnRegister'>
        <button onClick={GoToSIgnUp}  className='btn btn-light' style={buttonStyle} >
          Register
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
