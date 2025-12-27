import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newClass = await prisma.classSchedule.create({
      data: {
        type: body.type,
        titleEn: body.titleEn,
        titleRu: body.titleRu,
        descEn: body.descEn || null,
        descRu: body.descRu || null,
        dayOfWeek: body.dayOfWeek,
        startTime: body.startTime,
        duration: body.duration,
        capacity: body.capacity,
        isActive: true,
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }
}
