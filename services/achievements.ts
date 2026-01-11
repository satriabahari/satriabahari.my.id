import { createClient } from "@/common/utils/server";

interface GetAchievementsDataProps {
  category?: string;
  search?: string;
}

export const getAchievementsData = async ({
  category,
  search,
}: GetAchievementsDataProps) => {
  const supabase = createClient();

  let query = supabase.from("achievements").select();

  if (category) query = query.eq("category", category);
  if (search) query = query.ilike("name", `%${search}%`);

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map((item) => {
    const { data: imageData } = supabase.storage
      .from("achievements")
      .getPublicUrl(`${item.slug}.webp`);

    console.log("halo", imageData);

    return {
      ...item,
      image: imageData.publicUrl,
    };
  });
};
