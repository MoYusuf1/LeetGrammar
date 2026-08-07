export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  unitId: number;
  color: string;
  lessonIds: number[];
  prerequisites: string[];
}
