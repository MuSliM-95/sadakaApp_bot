import { Shape } from "../types/points.types";

/**
 * All possible block shapes in the game.
 * 1 represents a block, 0 represents empty space.
 * Each matrix defines the layout of the shape.
 */
export const SHAPES: Shape[] = [
	{ id: "1x1", matrix: [[1]], color: "bg-[#ffcc00]" }, // Single dot
	{ id: "1x2", matrix: [[1, 1]], color: "bg-[#ffcc00]" }, // Horizontal 2-block
	{ id: "1x3", matrix: [[1, 1, 1]], color: "bg-[#ffcc00]" }, // Horizontal 3-block
	{ id: "1x4", matrix: [[1, 1, 1, 1]], color: "bg-[#ffcc00]" }, // Horizontal 4-block
	{
	  id: "2x2",
	  matrix: [
		[1, 1],
		[1, 1],
	  ],
	  color: "bg-[#9933cc]",
	}, // Square
	{
	  id: "3x3",
	  matrix: [
		[1, 1, 1],
		[1, 1, 1],
		[1, 1, 1],
	  ],
	  color: "bg-[#cc2222]",
	}, // Large Square
	{
	  id: "L",
	  matrix: [
		[1, 0],
		[1, 0],
		[1, 1],
	  ],
	  color: "bg-[#ff8c00]",
	}, // L shape
	{
	  id: "L-rev",
	  matrix: [
		[0, 1],
		[0, 1],
		[1, 1],
	  ],
	  color: "bg-[#00d2ff]",
	}, // Reverse L shape
	{
	  id: "T",
	  matrix: [
		[1, 1, 1],
		[0, 1, 0],
	  ],
	  color: "bg-[#33cc33]",
	}, // T shape
	{
	  id: "Z",
	  matrix: [
		[1, 1, 0],
		[0, 1, 1],
	  ],
	  color: "bg-[#cc2222]",
	}, // Z shape
	{
	  id: "S",
	  matrix: [
		[0, 1, 1],
		[1, 1, 0],
	  ],
	  color: "bg-[#33cc33]",
	}, // S shape
	{
	  id: "3x3-corner",
	  matrix: [
		[1, 1, 1],
		[1, 0, 0],
		[1, 0, 0],
	  ],
	  color: "bg-[#ffcc00]",
	}, // Corner shape (5 blocks) - Top Left
	{
	  id: "3x3-corner-2",
	  matrix: [
		[1, 1, 1],
		[0, 0, 1],
		[0, 0, 1],
	  ],
	  color: "bg-[#ffcc00]",
	}, // Corner shape (5 blocks) - Top Right
	{
	  id: "3x3-corner-3",
	  matrix: [
		[1, 0, 0],
		[1, 0, 0],
		[1, 1, 1],
	  ],
	  color: "bg-[#ffcc00]",
	}, // Corner shape (5 blocks) - Bottom Left
	{
	  id: "3x3-corner-4",
	  matrix: [
		[0, 0, 1],
		[0, 0, 1],
		[1, 1, 1],
	  ],
	  color: "bg-[#ffcc00]",
	}, // Corner shape (5 blocks) - Bottom Right
	{
	  id: "corner-2x2-1",
	  matrix: [
		[1, 1],
		[1, 0],
	  ],
	  color: "bg-[#00d2ff]",
	}, // 2x2 Corner (3 blocks) - Top Left
	{
	  id: "corner-2x2-2",
	  matrix: [
		[1, 1],
		[0, 1],
	  ],
	  color: "bg-[#00d2ff]",
	}, // 2x2 Corner (3 blocks) - Top Right
	{
	  id: "corner-2x2-3",
	  matrix: [
		[1, 0],
		[1, 1],
	  ],
	  color: "bg-[#00d2ff]",
	}, // 2x2 Corner (3 blocks) - Bottom Left
	{
	  id: "corner-2x2-4",
	  matrix: [
		[0, 1],
		[1, 1],
	  ],
	  color: "bg-[#00d2ff]",
	}, // 2x2 Corner (3 blocks) - Bottom Right
	{
	  id: "3x2",
	  matrix: [
		[1, 1, 1],
		[1, 1, 1],
	  ],
	  color: "bg-[#cc2222]",
	}, // 3x2 rectangle
	{
	  id: "4x2",
	  matrix: [
		[1, 1, 1, 1],
		[1, 1, 1, 1],
	  ],
	  color: "bg-[#ffcc00]",
	}, // 4x2 rectangle
	{ id: "2x1", matrix: [[1], [1]], color: "bg-[#33cc33]" }, // Vertical 2-block
	{ id: "3x1", matrix: [[1], [1], [1]], color: "bg-[#33cc33]" }, // Vertical 3-block
	{ id: "4x1", matrix: [[1], [1], [1], [1]], color: "bg-[#33cc33]" }, // Vertical 4-block
	{ id: "1x5", matrix: [[1, 1, 1, 1, 1]], color: "bg-[#ffcc00]" }, // Horizontal 5-block
	{ id: "5x1", matrix: [[1], [1], [1], [1], [1]], color: "bg-[#33cc33]" }, // Vertical 5-block
	{
	  id: "side-t-left",
	  matrix: [
		[1, 0],
		[1, 1],
		[1, 0],
	  ],
	  color: "bg-[#9933cc]",
	}, // Side T shape Left
	{
	  id: "side-t-right",
	  matrix: [
		[0, 1],
		[1, 1],
		[0, 1],
	  ],
	  color: "bg-[#9933cc]",
	}, // Side T shape Right
	{
	  id: "diag-left",
	  matrix: [
		[1, 0],
		[0, 1],
	  ],
	  color: "bg-[#00d2ff]",
	}, // Diagonal 2-block Left
	{
	  id: "diag-right",
	  matrix: [
		[0, 1],
		[1, 0],
	  ],
	  color: "bg-[#00d2ff]",
	}, // Diagonal 2-block Right
  ];