export async function fetchProfileGetter() {
  const response = await fetch(`/api/applicant/profile`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to fetch profile getter: ${response.status} ${body}`,
    );
  }

  const data = await response.json();
  return data;
}

export async function createProfile(payload: any) {
  const response = await fetch(`/api/applicant/profile/create-profile`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to fetch profile create: ${response.status} ${body}`,
    );
  }

  const data = await response.json();
  return data;
}

export async function updateProfile(data: any) {
  const response = await fetch(`/api/applicant/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to update profile: ${response.status} ${body}`);
  }

  const updatedProfile = await response.json();
  return updatedProfile;
}
