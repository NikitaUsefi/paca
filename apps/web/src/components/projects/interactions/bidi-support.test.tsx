import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Sprint } from "@/lib/interaction-api";
import { AddTaskRow } from "./add-task-row";
import { SprintFormModal } from "./sprint-form-modal";

const sprint: Sprint = {
	id: "sprint-1",
	project_id: "project-1",
	name: "Sprint احراز هویت",
	goal: "تکمیل OAuth flow",
	status: "planned",
	created_at: "2026-01-01T00:00:00Z",
	updated_at: "2026-01-01T00:00:00Z",
};

describe("bidirectional sprint content", () => {
	it("uses automatic direction for quick-created task titles", () => {
		render(<AddTaskRow taskTypes={[]} onAdd={vi.fn()} />);

		fireEvent.click(screen.getByRole("button", { name: "Add task" }));

		const titleInput = screen.getByPlaceholderText("Task title…");
		expect(titleInput).toHaveAttribute("dir", "auto");
		expect(titleInput).toHaveClass("user-content-bidi");
	});

	it("uses automatic direction for sprint name and goal fields", () => {
		render(
			<SprintFormModal
				mode="edit"
				sprint={sprint}
				open
				onOpenChange={vi.fn()}
				onSubmit={vi.fn()}
			/>,
		);

		const nameInput = document.getElementById("es-name");
		const goalInput = document.getElementById("es-goal");
		expect(nameInput).toHaveAttribute("dir", "auto");
		expect(nameInput).toHaveClass("user-content-bidi");
		expect(goalInput).toHaveAttribute("dir", "auto");
		expect(goalInput).toHaveClass("user-content-bidi");
	});
});
