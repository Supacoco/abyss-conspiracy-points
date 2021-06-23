import { Lord } from "@/game-elements/lord/Lord";
import { LORD_FAMILY } from "@/rules/config";

export const walk = (
  start: number,
  adjacency: number[][],
  lords: Lord[]
): {
  coalition: number;
  family: LORD_FAMILY;
  visited: {
    [x: number]: boolean;
  };
} => {
  const result = [];
  const visited: { [key in number]: boolean } = {};

  (function dfs(point) {
    visited[point] = true;
    result.push({
      index: point,
      family: lords[point]?.getFamily() ?? null,
    });

    adjacency[point].forEach((neighbor) => {
      if (
        !visited[neighbor] &&
        lords[point] &&
        lords[point].getFamily() === lords[neighbor]?.getFamily()
      ) {
        return dfs(neighbor);
      }
    });
  })(start);

  return {
    coalition: result.length,
    family: result[0]?.family,
    visited,
  };
};
