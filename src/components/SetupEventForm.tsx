import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function SetupEventForm() {
  const [prizeAmount, setPrizeAmount] = useState('0');
  const [prizeTokenAddress, setPrizeTokenAddress] = useState('');
  const [firstWinnerPercentage, setFirstWinnerPercentage] = useState('50');
  const [secondWinnerPercentage, setSecondWinnerPercentage] = useState('30');
  const [thirdWinnerPercentage, setThirdWinnerPercentage] = useState('20');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrizeAmount(event.target.value);
  };

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrizeTokenAddress(event.target.value);
  };

  const handleChangeFirstWinner = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstWinnerPercentage(event.target.value);
  };

  const handleChangeSecondWinner = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondWinnerPercentage(event.target.value);
  };

  const handleChangeThirdWinner = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThirdWinnerPercentage(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        width: 'fit-content',
        borderRadius: '10px',
        padding: '2rem',
        background: 'white',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.05)',
        '& .MuiTextField-root': {m: 1},
      }}
      noValidate
      autoComplete="off">
      <Typography>Setup Event Form</Typography>
      <div>
        <TextField
          id="prize-amount"
          label="Prize Amount"
          variant="filled"
          value={prizeAmount}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          fullWidth
          id="prize-token-address"
          label="Prize Token Contract Address"
          variant="filled"
          value={prizeTokenAddress}
          onChange={handleChangeAddress}
        />
      </div>
      <div>
        <TextField
          id="first-winner-percentage"
          label="First Winner Percentage"
          variant="filled"
          value={firstWinnerPercentage}
          onChange={handleChangeFirstWinner}
        />
        <TextField
          id="second-winner-percentage"
          label="Second Winner percentage"
          variant="filled"
          value={secondWinnerPercentage}
          onChange={handleChangeSecondWinner}
        />
        <TextField
          id="third-winner-ratio"
          label="Third Winner Percentage"
          variant="filled"
          value={thirdWinnerPercentage}
          onChange={handleChangeThirdWinner}
        />
      </div>
    </Box>
  );
}
