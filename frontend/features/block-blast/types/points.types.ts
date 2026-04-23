import { UserRating } from "@/features/user/types/user.types";

export interface IPoints {
  id: number;
  score: number;
  user: UserRating;
}

export type Shape = {
  id: string;
  matrix: number[][];
  color: string;
  typeId?: string;
};

export type ShapeResult = Omit<Shape, 'typeId'>

export type Haptic = {
  impact: (style?: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
  notification: (type: "error" | "success" | "warning") => void;
  selection: () => void;
};

export type FloatingScores = {
  id: string;
  score: number;
  x: number;
  y: number;
}[];

export type GhostPosition = {
  r: number;
  c: number;
} | null;

export type CanPlaceShape = (
  shape: Shape,
  startR: number,
  startC: number,
  currentGrid: string[][]
) => boolean;

export type AvailableShapes = Shape[];

export type TToast = {
  message: string;
  type: "success" | "info" | "error";
} | null;


export type GameSessionType = { sessionId: string; seed: number };

export type Move = {
  shapeId: string;
  position: { r: number; c: number };
};

export type SubmitGameRequest = {
  sessionId: string;
  clientScore: number;
  moves: Move[];
};