import React from 'react';
import { render, act } from '@testing-library/react';
import useCurrentPosition from '../../src/hooks/useCurrentPosition';

// Mock component that uses the hook
function MockComponent({ defaultPosition }) {
  const [position] = useCurrentPosition(defaultPosition);
  return <div>{position && position.join(', ')}</div>;
}

describe('useCurrentPosition', () => {
  // Setup mock for navigator.geolocation.getCurrentPosition
  beforeAll(() => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn()
    };
  });

  it('updates position on successful geolocation fetch', async () => {
    // Mock implementation to simulate successful position fetch
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({ coords: { latitude: 10, longitude: 20 } })
    );

    let container;
    act(() => {
      // Render mock component to trigger the hook
      const result = render(<MockComponent defaultPosition={[0, 0]} />);
      container = result.container;
    });

    // Verify the position state was updated
    expect(container.textContent).toBe('10, 20');
  });

  it('logs an error and does not update position on geolocation failure', async () => {
    // Mock implementation to simulate failure
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    navigator.geolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
      error()
    );

    let container;
    act(() => {
      // Render mock component with defaultPosition
      const result = render(<MockComponent defaultPosition={[0, 0]} />);
      container = result.container;
    });

    // Verify default position is used and an error is logged
    expect(container.textContent).toBe('0, 0');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Could not fetch your current location.');

    // Clean up
    consoleErrorSpy.mockRestore();
  });

  // Clear mocks after all tests are done
  afterAll(() => {
    jest.restoreAllMocks();
  });
});
