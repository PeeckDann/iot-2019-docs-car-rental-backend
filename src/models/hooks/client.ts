export const generateDefaultClientData = async (clientInstance): Promise<void> => {
  await clientInstance.createFullName({ name: 'Vlad', surname: 'Dorofeiev', patronymic: 'Amogusovych' });
  await clientInstance.createAddress({
    country: 'Ukraine',
    city: 'Lviv',
    street: 'Bandery str.',
    buildingNumber: 69,
    flatNumber: 420
  });
  await clientInstance.createBalance({
    hryvnias: 2,
    kopiykas: 28
  });
};
