import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ethers} from 'ethers';

export default function SetupEventForm() {
  const [prizeAmount, setPrizeAmount] = useState('0');
  const [prizeTokenAddress, setPrizeTokenAddress] = useState('');

  const [firstWinnerPercentage, setFirstWinnerPercentage] = useState('50');
  const [secondWinnerPercentage, setSecondWinnerPercentage] = useState('30');
  const [thirdWinnerPercentage, setThirdWinnerPercentage] = useState('20');

  const [stringVoters, setStringVoters] = useState('');
  const [votersConfirmed, setVotersConfirmed] = useState();
  const [voters, setVoters] = useState([]);

  const [stringParticipants, setStringParticipants] = useState('');
  const [participantsConfirmed, setParticipantsConfirmed] = useState();
  const [participants, setParticipants] = useState([]);

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

  const handleChangeVoters = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStringVoters(event.target.value);
  };

  const convertVotersIntoArray = () => {
    const temp = stringVoters.replace(/[\r\n]/gm, '').split(',');
    setVoters(temp);
    setVotersConfirmed(true);
  };

  const clearVoters = () => {
    setStringVoters('');
    setVoters([]);
    setVotersConfirmed(false);
  };

  const handleChangeParticipants = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStringParticipants(event.target.value);
  };

  const convertParticipantsIntoArray = () => {
    const temp = stringParticipants.replace(/[\r\n]/gm, '').split(',');
    setParticipants(temp);
    setParticipantsConfirmed(true);
  };

  const clearParticipants = () => {
    setStringVoters('');
    setVoters([]);
    setVotersConfirmed(false);
  };

  const isFormValid = () => {
    const {utils} = ethers;

    if (
      Number(prizeAmount) > 0 ||
      utils.isHexString(prizeTokenAddress) ||
      Number(firstWinnerPercentage) ||
      Number(secondWinnerPercentage) ||
      Number(thirdWinnerPercentage) ||
      voters.length > 0 ||
      participants.length > 0
    ) {
      return true;
    }

    return false;
  };

  const handleSubmit = () => {
    console.log({
      prizeAmount,
      prizeTokenAddress,
      firstWinnerPercentage,
      secondWinnerPercentage,
      thirdWinnerPercentage,
      voters,
      participants,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        width: 'fit-content',
        borderRadius: '10px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        background: 'white',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.05)',
        '& .MuiTextField-root': {m: 1},
      }}
      noValidate
      autoComplete="off">
      <Typography variant="h3" color="primary">
        Setup your own event
      </Typography>
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

      {/**Voters section**/}
      <div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            id="voters"
            label="List of Voters"
            variant="filled"
            multiline
            disabled={votersConfirmed}
            value={stringVoters}
            onChange={handleChangeVoters}
          />
        </div>
        <Button
          onClick={convertVotersIntoArray}
          disabled={votersConfirmed || stringVoters.length === 0}>
          Confirm Voters
        </Button>
        <Button onClick={clearVoters}>Clear Voters</Button>
      </div>

      {/**Participants section**/}
      <div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <TextField
            id="participants"
            label="List of Participants"
            variant="filled"
            multiline
            disabled={participantsConfirmed}
            value={stringParticipants}
            onChange={handleChangeParticipants}
          />
        </div>
        <Button
          onClick={convertParticipantsIntoArray}
          disabled={participantsConfirmed || stringParticipants.length === 0}>
          Confirm Participants
        </Button>
        <Button onClick={clearParticipants}>Clear Participants</Button>
      </div>

      <div style={{marginTop: '1rem'}}>
        <Button variant="outlined" onClick={handleSubmit} disabled={!isFormValid()}>
          Create Event
        </Button>
      </div>
    </Box>
  );
}
