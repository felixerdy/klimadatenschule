import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// POST /api/user
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const schoolCount = await prisma.organisation.count();
  const treeCount = await prisma.treeRecord.count();
  const mealCount = await prisma.mealRecord.count();
  const paperCount = await prisma.paperRecord.count();
  const mobilityCount = await prisma.mobilityRecord.count();

  const totalTreeCo2 = await prisma.treeRecord.aggregate({
    _sum: {
      co2: true
    }
  });

  const totalTrafficKm = await prisma.mobilityRecord.aggregate({
    _sum: {
      bahn: true,
      bus: true,
      fahrrad: true,
      fuss: true,
      pkw: true,
      ubahn: true
    }
  });

  const totalMealCount = await prisma.mealRecord.aggregate({
    _sum: {
      count: true
    }
  });

  const totalPaperCount = await prisma.paperRecord.aggregate({
    _sum: {
      a4: true,
      a5: true,
      a6: true,
      kopierpapier: true,
      zeichenmappe: true
    }
  });

  const totalRecyclingPaperCount = await prisma.paperRecord.aggregate({
    _sum: {
      a4_recycling: true,
      a5_recycling: true,
      a6_recycling: true,
      kopierpapier_recycling: true,
      zeichenmappe_recycling: true
    }
  });

  res.status(201).json({
    schoolCount,
    datasets: treeCount + mealCount + paperCount + mobilityCount,
    tree: {
      count: treeCount,
      totalCo2: totalTreeCo2._sum.co2.toFixed(2)
    },
    mobility: {
      count: mobilityCount,
      totalKm: Object.keys(totalTrafficKm._sum).reduce(
        (a, b) => a + totalTrafficKm._sum[b],
        0
      )
    },
    meal: {
      count: mealCount,
      portions: totalMealCount._sum.count
    },
    paper: {
      count: paperCount,
      paperProductCount: Object.keys(totalPaperCount._sum)
        .reduce((a, b) => a + totalPaperCount._sum[b], 0)
        .toFixed(2),
      recyclingPaperProductCount: Object.keys(totalRecyclingPaperCount._sum)
        .reduce((a, b) => a + totalRecyclingPaperCount._sum[b], 0)
        .toFixed(2)
    }
  });
}
