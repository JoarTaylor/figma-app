import { SpinnerContainer, StyledSpinner } from './spinner.styles';

const Spinner = () => {
  return (
    <SpinnerContainer>
      <StyledSpinner />
      <h1>Loading...</h1>
    </SpinnerContainer>
  );
};

export default Spinner;
