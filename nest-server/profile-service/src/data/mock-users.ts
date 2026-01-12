export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  timezone: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    createdAt: new Date('2024-01-15'),
    preferences: {
      theme: 'dark',
      notifications: true,
      language: 'en',
      timezone: 'UTC-5',
    },
  },
  {
    id: '2',
    email: 'jane.smith@test.com',
    password: 'MyPassword456#',
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    createdAt: new Date('2024-01-20'),
    preferences: {
      theme: 'light',
      notifications: false,
      language: 'en',
      timezone: 'UTC-8',
    },
  },
  {
    id: '3',
    email: 'mike.wilson@demo.com',
    password: 'TestPass789$',
    firstName: 'Mike',
    lastName: 'Wilson',
    username: 'mikewilson',
    createdAt: new Date('2024-02-01'),
    preferences: {
      theme: 'dark',
      notifications: true,
      language: 'es',
      timezone: 'UTC-6',
    },
  },
  {
    id: '4',
    email: 'sarah.johnson@sample.com',
    password: 'DemoPass321@',
    firstName: 'Sarah',
    lastName: 'Johnson',
    username: 'sarahjohnson',
    createdAt: new Date('2024-02-10'),
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'fr',
      timezone: 'UTC+1',
    },
  },
  {
    id: '5',
    email: 'alex.brown@mock.com',
    password: 'MockPass654%',
    firstName: 'Alex',
    lastName: 'Brown',
    username: 'alexbrown',
    createdAt: new Date('2024-02-15'),
    preferences: {
      theme: 'dark',
      notifications: false,
      language: 'de',
      timezone: 'UTC+2',
    },
  },
];

export const getUserPreferences = (
  userId: string,
): UserPreferences | undefined => {
  const user = mockUsers.find((user) => user.id === userId);
  return user?.preferences;
};

export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email === email);
};

export const findUserByUsername = (username: string): User | undefined => {
  return mockUsers.find((user) => user.username === username);
};

export const addUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...userData,
    id: (mockUsers.length + 1).toString(),
    createdAt: new Date(),
  };
  mockUsers.push(newUser);
  return newUser;
};
