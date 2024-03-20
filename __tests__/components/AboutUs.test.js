import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AboutUs from '../../src/components/AboutUs';

describe('AboutUs Component', () => {
  beforeEach(() => {
    render(<AboutUs />);
  });

  test('renders main heading', () => {
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toBeInTheDocument();
  });

  test('renders subheading', () => {
    const subHeading = screen.getByRole('heading', { level: 3 });
    expect(subHeading).toBeInTheDocument();
  });

  test('renders paragraphs with text content', () => {
    const paragraphs = screen.getAllByText(/./);
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  test('renders team section with member cards', () => {
    const teamMembers = screen.getAllByTestId('team-member');
    expect(teamMembers.length).toBeGreaterThan(0);
  });

  test('each team member has an image', () => {
    const teamMemberImages = screen.getAllByRole('img');
    expect(teamMemberImages.length).toBeGreaterThan(0);
    teamMemberImages.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });
});

