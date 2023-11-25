import { render, screen } from '@testing-library/react';
import BoardCell from './boardCell';
import BoardContainer from './boardContainer';

// BoardCell tests
describe('BoardCell', () => {
  test('renders without error', () => {
    render(<BoardCell />);
    // Assert that the component renders without throwing any errors
  });

  test('renders with correct background color when isContainShip and isAttacked are true', () => {
    render(<BoardCell isContainShip={true} isAttacked={true} />);
    // Assert that the component renders with the expected background color
  });

  // Add more tests for different scenarios and props as needed
});

// BoardContainer tests
describe('BoardContainer', () => {
  test('renders without error', () => {
    render(<BoardContainer />);
    // Assert that the component renders without throwing any errors
  });

  test('renders the correct board title based on isPlayerBord prop', () => {
    render(<BoardContainer recivedBoard="player" />);
    // Assert that the component renders the correct board title
  });

  // Add more tests for different scenarios and props as needed
});