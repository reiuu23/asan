export const splitFullName = fullName => {

  const nameParts = fullName.trim().split(/\s+/);
  const lastName = nameParts.pop();
  const firstName = nameParts.shift();

  const middleInitial = nameParts.map(name => name.charAt(0)).join('. ');

  return {
    lastName: lastName,
    firstName: firstName,
    middleInitial: middleInitial
  };
}

