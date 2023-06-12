import { UserRepository } from 'src/user/repository/user.repository';

const adminUser = {
  id: 'fde3202e-db9e-48ed-898f-504bb53e8bab',
  name: 'admin',
  email: 'admin@email.com',
  password: '$2b$10$nlXc.iFRtI.L4C9EO3t50uoVcvA8BxOPilDEdqI4/zcTvFLy0pge6',
};

export const addDefaultAdmin = async (userRepository: UserRepository) => {
  const user = await userRepository.findOne({ where: { id: adminUser.id } });
  if (user) {
    console.log('admin user found!');
    return;
  }
  console.log('admin user not found, creating...');
  await userRepository.insert(adminUser);
};
