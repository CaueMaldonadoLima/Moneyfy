import controller from "@/app/api/categories/controller";
import util from "@/app/api/utils";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const sessionId = util.getSessionId();

  try {
    const result = await controller.getByUserId(
      { userId: params.id },
      sessionId,
    );
    return util.successResponse(result, "Categories retrieved successfully");
  } catch (error) {
    return util.errorResponse(error as Error);
  }
}
