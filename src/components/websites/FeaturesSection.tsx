import { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Target } from 'lucide-react';
import { basePackageIncludes, basePackageExclusions } from '@/lib/pricingConfig';

export const FeaturesSection = memo(function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-blog">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Get Started With Our Basic Website Starter Package</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to launch a professional online presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Includes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Included Features
                </CardTitle>
                <CardDescription>
                  Standard with every website package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {basePackageIncludes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Excludes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  Not Included
                </CardTitle>
                <CardDescription>
                  Available separately or client-provided
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {basePackageExclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-xl leading-none mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
});
