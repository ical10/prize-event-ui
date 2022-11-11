import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import {ethers} from 'ethers';
import {useNetwork, usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi';
import PrizeEventAbi from 'assets/PrizeEvent-abi.json';
import useDebounce from 'src/hooks/useDebounce';

export default function SetupEventForm() {
  const [prizeAmount, setPrizeAmount] = useState('0');
  const debouncedPrizeAmount = useDebounce(prizeAmount);

  const {chain} = useNetwork();

  const [prizeTokenAddress, setPrizeTokenAddress] = useState(
    '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
  );
  const debouncedPrizeTokenAddress = useDebounce(prizeTokenAddress);

  const [firstWinnerPercentage, setFirstWinnerPercentage] = useState('50');
  const [secondWinnerPercentage, setSecondWinnerPercentage] = useState('30');
  const [thirdWinnerPercentage, setThirdWinnerPercentage] = useState('20');
  const debouncedFirstWinnerPercentage = useDebounce(firstWinnerPercentage);
  const debouncedSecondWinnerPercentage = useDebounce(secondWinnerPercentage);
  const debouncedThirdWinnerPercentage = useDebounce(thirdWinnerPercentage);

  const [stringVoters, setStringVoters] = useState('');
  const [votersConfirmed, setVotersConfirmed] = useState(false);
  const [voters, setVoters] = useState<string[]>([]);
  const debouncedVoters = useDebounce(voters);

  const [stringParticipants, setStringParticipants] = useState('');
  const [participantsConfirmed, setParticipantsConfirmed] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const debouncedParticipants = useDebounce(participants);

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

  const {config} = usePrepareContractWrite({
    address: '0xdCC94d087a9b5fbbf64d31254771d3880DdED4eC',
    abi: PrizeEventAbi,
    functionName: 'setupEvent',
    args: [
      parseInt(debouncedPrizeAmount),
      debouncedPrizeTokenAddress,
      [
        parseInt(debouncedFirstWinnerPercentage),
        parseInt(debouncedSecondWinnerPercentage),
        parseInt(debouncedThirdWinnerPercentage),
      ],
      debouncedVoters,
      debouncedParticipants,
    ],
    enabled: isFormValid(),
  });

  // @ts-ignore
  const {data, write} = useContractWrite(config);

  const {isLoading, isSuccess} = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Box
      component="form"
      onSubmit={e => {
        e.preventDefault();
        write?.();
      }}
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
            placeholder="0x..abc, 0x...cde, 0x..."
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
            placeholder="0x..abc, 0x...cde, 0x..."
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
        <Button variant="outlined" type="submit" disabled={!write || isLoading}>
          {isLoading ? 'Creating event...' : 'Create Event'}
        </Button>
      </div>

      {isSuccess && (
        <div>
          Successfully created your event!
          <div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`${chain?.blockExplorers?.etherscan?.url}/tx/${data?.hash}`}>
              Tx on Etherscan
            </Link>
          </div>
        </div>
      )}
    </Box>
  );
}
