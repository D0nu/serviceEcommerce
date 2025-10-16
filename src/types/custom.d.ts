declare module "passport-google-oauth20";
declare module "passport-facebook";
declare module "passport-twitter";


// Minimal type for Google profile
interface GoogleProfile {
  id: string;
  displayName: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
  provider: string;
}

interface FacebookProfile {
  id: string;
  displayName: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
  provider: string;
}

interface TwitterProfile {
  id: string;
  displayName: string;
  emails?: { value: string }[];
  photos?: { value: string }[];
  provider: string;
}
