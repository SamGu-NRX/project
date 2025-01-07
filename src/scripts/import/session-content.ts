const { randomUUID } = require("crypto");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const db = new PrismaClient();

interface ExitTicketQuestion {
  questionType: string;
  questionText: string;
  options?: string[];
  correctAnswer?: number;
}

async function main() {
  // 1) Upsert (create if needed) the single "AI Innovate Scholars" course
  const COURSE_ID = randomUUID();
  await db.course.upsert({
    where: { id: COURSE_ID },
    create: {
      id: COURSE_ID,
      title: "AI Innovate Scholars",
      description: "2025 Spring Cohort",
    },
    update: {},
  });

  // 2) Parse your session JSON
  const data = JSON.parse(
    fs.readFileSync("../../data/session-content.json", "utf-8"),
  );

  // 3) Loop over each session
  for (const sessionData of data) {
    // Create the Session (no "id" field => auto-generated UUID)
    const session = await db.session.create({
      data: {
        id: randomUUID(),
        courseId: COURSE_ID, // Link it to the single course
        title: sessionData.title,
        description: sessionData.description,
        objectives: sessionData.objectives,
        videoUrl: sessionData.videoUrl,
        sequenceOrder: sessionData.sequenceOrder,
      },
    });

    // If exitTicket has questions
    if (sessionData.exitTicket?.questions?.length) {
      await db.exitTicket.create({
        data: {
          sessionId: session.id, // auto-generated from above
          questions: {
            create: sessionData.exitTicket.questions.map(
              (q: ExitTicketQuestion) => ({
                questionType: q.questionType,
                questionText: q.questionText,
                options: q.options || undefined,
                correctAnswer:
                  q.correctAnswer !== undefined ? q.correctAnswer : undefined,
              }),
            ),
          },
        },
      });
    }

    // Create Resources if provided
    if (sessionData.resources && sessionData.resources.length > 0) {
      for (const resource of sessionData.resources) {
        await db.resource.create({
          data: {
            sessionId: session.id,
            title: resource.title,
            type: resource.type,
            link: resource.link,
          },
        });
      }
    }

    console.log(`Imported session: ${session.title}`);
  }

  console.log("Data import completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
