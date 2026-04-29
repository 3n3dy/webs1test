import {
  FileText,
  Folder,
  Laptop,
  Brain,
  Smartphone,
  PenTool,
  Coffee,
  Book,
  Calendar,
  Lightbulb,
  Paperclip,
} from "lucide-react";

export const CANVAS_ICONS = [
  FileText,
  Folder,
  Laptop,
  Brain,
  Smartphone,
  PenTool,
  Coffee,
  Book,
  Calendar,
  Lightbulb,
  Paperclip,
];

export const CANVAS_OBJECT_COUNT = 20;
export const MOUSE_REPEL_DISTANCE = 150;
export const MOUSE_REPEL_FORCE = 1.2;

export type CanvasIcon = (typeof CANVAS_ICONS)[number];
