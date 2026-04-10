
CREATE TABLE public.spotlight (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  video_url TEXT,
  more_link TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.spotlight ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Spotlight is publicly readable"
ON public.spotlight
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins can insert spotlight"
ON public.spotlight
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update spotlight"
ON public.spotlight
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete spotlight"
ON public.spotlight
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_spotlight_updated_at
BEFORE UPDATE ON public.spotlight
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
