export interface ActionSuccess {
  success: true;
  error?: never;
}

export interface ActionError {
  success: false;
  error: string;
}

export type ActionResult = ActionSuccess | ActionError;
