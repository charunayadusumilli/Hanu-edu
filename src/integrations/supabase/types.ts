export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: string
          admin_user_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_audit_logs_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_configurations: {
        Row: {
          config_type: string
          config_value: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          updated_at: string
        }
        Insert: {
          config_type: string
          config_value: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Update: {
          config_type?: string
          config_value?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          department: string | null
          employee_id: string
          id: string
          is_active: boolean | null
          permissions: Json | null
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          employee_id: string
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          employee_id?: string
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_course_recommendations: {
        Row: {
          confidence_score: number | null
          course_id: string | null
          created_at: string | null
          id: string
          is_dismissed: boolean | null
          metadata: Json | null
          reasoning: string | null
          recommendation_type: string
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          metadata?: Json | null
          reasoning?: string | null
          recommendation_type: string
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          metadata?: Json | null
          reasoning?: string | null
          recommendation_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_course_recommendations_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      api_configurations: {
        Row: {
          config_name: string
          config_value: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          source_id: string
          updated_at: string | null
        }
        Insert: {
          config_name: string
          config_value?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          source_id: string
          updated_at?: string | null
        }
        Update: {
          config_name?: string
          config_value?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          source_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_configurations_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "job_scraping_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string
          id: string
          published_at: string | null
          read_time_minutes: number | null
          title: string
        }
        Insert: {
          author?: string | null
          category: string
          content: string
          created_at?: string
          id?: string
          published_at?: string | null
          read_time_minutes?: number | null
          title: string
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          published_at?: string | null
          read_time_minutes?: number | null
          title?: string
        }
        Relationships: []
      }
      assessment_attempts: {
        Row: {
          answers: Json
          assessment_id: string | null
          attempt_number: number | null
          completed_at: string | null
          enrollment_id: string | null
          id: string
          passed: boolean | null
          score: number | null
          started_at: string | null
          time_spent_minutes: number | null
          user_id: string | null
        }
        Insert: {
          answers?: Json
          assessment_id?: string | null
          attempt_number?: number | null
          completed_at?: string | null
          enrollment_id?: string | null
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Update: {
          answers?: Json
          assessment_id?: string | null
          attempt_number?: number | null
          completed_at?: string | null
          enrollment_id?: string | null
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "course_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_attempts_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_discussions: {
        Row: {
          assessment_id: number
          content: string
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assessment_id: number
          content: string
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assessment_id?: number
          content?: string
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      auth_attempts: {
        Row: {
          attempt_type: string
          created_at: string | null
          email: string | null
          failure_reason: string | null
          id: string
          ip_address: unknown | null
          success: boolean | null
          user_agent: string | null
        }
        Insert: {
          attempt_type: string
          created_at?: string | null
          email?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: unknown | null
          success?: boolean | null
          user_agent?: string | null
        }
        Update: {
          attempt_type?: string
          created_at?: string | null
          email?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: unknown | null
          success?: boolean | null
          user_agent?: string | null
        }
        Relationships: []
      }
      auth_rate_limits: {
        Row: {
          attempt_type: string
          attempts: number | null
          blocked_until: string | null
          created_at: string | null
          id: string
          ip_address: unknown
          window_start: string | null
        }
        Insert: {
          attempt_type: string
          attempts?: number | null
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          ip_address: unknown
          window_start?: string | null
        }
        Update: {
          attempt_type?: string
          attempts?: number | null
          blocked_until?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          window_start?: string | null
        }
        Relationships: []
      }
      auth_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          expires_at: string
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_activity_at: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity_at?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity_at?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auth_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          assessment_id: number
          certificate_id: string
          id: string
          issued_at: string | null
          pdf_url: string | null
          score: number
          user_id: string
          valid_until: string | null
          verification_code: string | null
        }
        Insert: {
          assessment_id: number
          certificate_id: string
          id?: string
          issued_at?: string | null
          pdf_url?: string | null
          score: number
          user_id: string
          valid_until?: string | null
          verification_code?: string | null
        }
        Update: {
          assessment_id?: number
          certificate_id?: string
          id?: string
          issued_at?: string | null
          pdf_url?: string | null
          score?: number
          user_id?: string
          valid_until?: string | null
          verification_code?: string | null
        }
        Relationships: []
      }
      client_challenges: {
        Row: {
          assigned_expert_id: string | null
          budget_range: string | null
          challenge_title: string
          company_name: string
          contact_email: string
          contact_phone: string | null
          created_at: string
          description: string
          id: string
          industry: string
          status: string
          supporting_documents_urls: string[] | null
          timeline: string | null
          updated_at: string
          urgency: string | null
          user_id: string | null
        }
        Insert: {
          assigned_expert_id?: string | null
          budget_range?: string | null
          challenge_title: string
          company_name: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          description: string
          id?: string
          industry: string
          status?: string
          supporting_documents_urls?: string[] | null
          timeline?: string | null
          updated_at?: string
          urgency?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_expert_id?: string | null
          budget_range?: string | null
          challenge_title?: string
          company_name?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          description?: string
          id?: string
          industry?: string
          status?: string
          supporting_documents_urls?: string[] | null
          timeline?: string | null
          updated_at?: string
          urgency?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      company_profiles: {
        Row: {
          company_name: string
          company_size: string | null
          created_at: string | null
          description: string | null
          founded_year: number | null
          glassdoor_rating: number | null
          headquarters_location: string | null
          hiring_actively: boolean | null
          id: string
          industry: string | null
          linkedin_url: string | null
          logo_url: string | null
          updated_at: string | null
          verified: boolean | null
          visa_sponsorship_available: boolean | null
          website: string | null
        }
        Insert: {
          company_name: string
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          founded_year?: number | null
          glassdoor_rating?: number | null
          headquarters_location?: string | null
          hiring_actively?: boolean | null
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          updated_at?: string | null
          verified?: boolean | null
          visa_sponsorship_available?: boolean | null
          website?: string | null
        }
        Update: {
          company_name?: string
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          founded_year?: number | null
          glassdoor_rating?: number | null
          headquarters_location?: string | null
          hiring_actively?: boolean | null
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          updated_at?: string | null
          verified?: boolean | null
          visa_sponsorship_available?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      course_assessments: {
        Row: {
          assessment_type: string | null
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_required: boolean | null
          max_attempts: number | null
          module_id: string | null
          passing_score: number | null
          questions: Json
          time_limit_minutes: number | null
          title: string
        }
        Insert: {
          assessment_type?: string | null
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_required?: boolean | null
          max_attempts?: number | null
          module_id?: string | null
          passing_score?: number | null
          questions?: Json
          time_limit_minutes?: number | null
          title: string
        }
        Update: {
          assessment_type?: string | null
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_required?: boolean | null
          max_attempts?: number | null
          module_id?: string | null
          passing_score?: number | null
          questions?: Json
          time_limit_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_assessments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_assessments_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_content: {
        Row: {
          content_data: Json | null
          content_type: string
          content_url: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          is_free_preview: boolean | null
          lesson_id: string | null
          order_index: number
          title: string
          updated_at: string | null
        }
        Insert: {
          content_data?: Json | null
          content_type: string
          content_url?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          lesson_id?: string | null
          order_index?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          content_data?: Json | null
          content_type?: string
          content_url?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          lesson_id?: string | null
          order_index?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_content_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      course_discussion_replies: {
        Row: {
          content: string
          created_at: string | null
          discussion_id: string | null
          id: string
          is_instructor_reply: boolean | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          discussion_id?: string | null
          id?: string
          is_instructor_reply?: boolean | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          discussion_id?: string | null
          id?: string
          is_instructor_reply?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "course_discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      course_discussions: {
        Row: {
          content: string
          course_id: string | null
          created_at: string | null
          id: string
          is_pinned: boolean | null
          last_reply_at: string | null
          lesson_id: string | null
          reply_count: number | null
          title: string
          user_id: string | null
        }
        Insert: {
          content: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          last_reply_at?: string | null
          lesson_id?: string | null
          reply_count?: number | null
          title: string
          user_id?: string | null
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          last_reply_at?: string | null
          lesson_id?: string | null
          reply_count?: number | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_discussions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discussions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          certificate_issued: boolean | null
          completed_at: string | null
          course_id: string | null
          current_lesson_id: string | null
          current_module_id: string | null
          enrolled_at: string | null
          id: string
          payment_status: string | null
          progress_percentage: number | null
          user_id: string | null
        }
        Insert: {
          certificate_issued?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          current_lesson_id?: string | null
          current_module_id?: string | null
          enrolled_at?: string | null
          id?: string
          payment_status?: string | null
          progress_percentage?: number | null
          user_id?: string | null
        }
        Update: {
          certificate_issued?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          current_lesson_id?: string | null
          current_module_id?: string | null
          enrolled_at?: string | null
          id?: string
          payment_status?: string | null
          progress_percentage?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_current_lesson_id_fkey"
            columns: ["current_lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_current_module_id_fkey"
            columns: ["current_module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_locked: boolean | null
          module_order: number
          title: string
          unlock_after_module_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_locked?: boolean | null
          module_order: number
          title: string
          unlock_after_module_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_locked?: boolean | null
          module_order?: number
          title?: string
          unlock_after_module_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_modules_unlock_after_module_id_fkey"
            columns: ["unlock_after_module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_notes: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_bookmark: boolean | null
          lesson_id: string | null
          timestamp_seconds: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_bookmark?: boolean | null
          lesson_id?: string | null
          timestamp_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_bookmark?: boolean | null
          lesson_id?: string | null
          timestamp_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_notes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      course_payments: {
        Row: {
          amount: number
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          payment_method: string | null
          status: string | null
          stripe_session_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_payments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_reviews: {
        Row: {
          course_id: string | null
          created_at: string | null
          enrollment_id: string | null
          id: string
          is_featured: boolean | null
          rating: number | null
          review_text: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          enrollment_id?: string | null
          id?: string
          is_featured?: boolean | null
          rating?: number | null
          review_text?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          enrollment_id?: string | null
          id?: string
          is_featured?: boolean | null
          rating?: number | null
          review_text?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          average_rating: number | null
          category: string | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          duration_weeks: number | null
          id: string
          instructor_id: string | null
          is_published: boolean | null
          learning_objectives: string[] | null
          prerequisites: string[] | null
          price: number | null
          thumbnail_url: string | null
          title: string
          total_enrollments: number | null
          total_lessons: number | null
          total_modules: number | null
          updated_at: string | null
          video_intro_url: string | null
        }
        Insert: {
          average_rating?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          duration_weeks?: number | null
          id?: string
          instructor_id?: string | null
          is_published?: boolean | null
          learning_objectives?: string[] | null
          prerequisites?: string[] | null
          price?: number | null
          thumbnail_url?: string | null
          title: string
          total_enrollments?: number | null
          total_lessons?: number | null
          total_modules?: number | null
          updated_at?: string | null
          video_intro_url?: string | null
        }
        Update: {
          average_rating?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          duration_weeks?: number | null
          id?: string
          instructor_id?: string | null
          is_published?: boolean | null
          learning_objectives?: string[] | null
          prerequisites?: string[] | null
          price?: number | null
          thumbnail_url?: string | null
          title?: string
          total_enrollments?: number | null
          total_lessons?: number | null
          total_modules?: number | null
          updated_at?: string | null
          video_intro_url?: string | null
        }
        Relationships: []
      }
      discussion_replies: {
        Row: {
          content: string
          created_at: string | null
          discussion_id: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          discussion_id: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          discussion_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "assessment_discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      documentation: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          created_by: string | null
          document_type: string
          id: string
          is_published: boolean | null
          title: string
          updated_at: string | null
          updated_by: string | null
          version: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          document_type: string
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          version?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          document_type?: string
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentation_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentation_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      experts: {
        Row: {
          availability_status: string | null
          bio: string | null
          created_at: string
          experience_years: number | null
          hourly_rate: number | null
          id: string
          industries: string[]
          name: string
          profile_image_url: string | null
          specialties: string[]
          title: string
          user_id: string | null
        }
        Insert: {
          availability_status?: string | null
          bio?: string | null
          created_at?: string
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          industries: string[]
          name: string
          profile_image_url?: string | null
          specialties: string[]
          title: string
          user_id?: string | null
        }
        Update: {
          availability_status?: string | null
          bio?: string | null
          created_at?: string
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          industries?: string[]
          name?: string
          profile_image_url?: string | null
          specialties?: string[]
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      job_alerts: {
        Row: {
          alert_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          jobs_found_last_run: number | null
          last_triggered_at: string | null
          notification_frequency: string | null
          search_criteria: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          alert_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          jobs_found_last_run?: number | null
          last_triggered_at?: string | null
          notification_frequency?: string | null
          search_criteria: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          alert_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          jobs_found_last_run?: number | null
          last_triggered_at?: string | null
          notification_frequency?: string | null
          search_criteria?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      job_application_timeline: {
        Row: {
          application_id: string
          automated: boolean | null
          created_at: string | null
          event_date: string
          event_details: Json | null
          event_type: string
          id: string
        }
        Insert: {
          application_id: string
          automated?: boolean | null
          created_at?: string | null
          event_date?: string
          event_details?: Json | null
          event_type: string
          id?: string
        }
        Update: {
          application_id?: string
          automated?: boolean | null
          created_at?: string | null
          event_date?: string
          event_details?: Json | null
          event_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_application_timeline_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "job_applications_extended"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applied_at: string
          id: string
          job_id: string
          notes: string | null
          status: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          id?: string
          job_id: string
          notes?: string | null
          status?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          id?: string
          job_id?: string
          notes?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications_extended: {
        Row: {
          application_source: string | null
          applied_at: string | null
          cover_letter: string | null
          created_at: string | null
          custom_resume_used: boolean | null
          feedback_received: string | null
          id: string
          interview_dates: string[] | null
          job_id: string
          last_follow_up_at: string | null
          next_follow_up_at: string | null
          notes: string | null
          referrer_id: string | null
          rejection_reason: string | null
          salary_offered: number | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_source?: string | null
          applied_at?: string | null
          cover_letter?: string | null
          created_at?: string | null
          custom_resume_used?: boolean | null
          feedback_received?: string | null
          id?: string
          interview_dates?: string[] | null
          job_id: string
          last_follow_up_at?: string | null
          next_follow_up_at?: string | null
          notes?: string | null
          referrer_id?: string | null
          rejection_reason?: string | null
          salary_offered?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_source?: string | null
          applied_at?: string | null
          cover_letter?: string | null
          created_at?: string | null
          custom_resume_used?: boolean | null
          feedback_received?: string | null
          id?: string
          interview_dates?: string[] | null
          job_id?: string
          last_follow_up_at?: string | null
          next_follow_up_at?: string | null
          notes?: string | null
          referrer_id?: string | null
          rejection_reason?: string | null
          salary_offered?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_extended_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_duplicates: {
        Row: {
          confidence_score: number
          created_at: string | null
          duplicate_job_id: string
          id: string
          manual_review: boolean | null
          master_job_id: string
          matching_criteria: Json
          verified: boolean | null
        }
        Insert: {
          confidence_score: number
          created_at?: string | null
          duplicate_job_id: string
          id?: string
          manual_review?: boolean | null
          master_job_id: string
          matching_criteria: Json
          verified?: boolean | null
        }
        Update: {
          confidence_score?: number
          created_at?: string | null
          duplicate_job_id?: string
          id?: string
          manual_review?: boolean | null
          master_job_id?: string
          matching_criteria?: Json
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "job_duplicates_duplicate_job_id_fkey"
            columns: ["duplicate_job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_duplicates_master_job_id_fkey"
            columns: ["master_job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_match_scores: {
        Row: {
          applied_through_platform: boolean | null
          bookmarked_at: string | null
          clicked_at: string | null
          created_at: string | null
          experience_match_score: number | null
          id: string
          job_id: string
          location_match_score: number | null
          match_reasons: string[] | null
          overall_score: number | null
          recommendation_confidence: number | null
          salary_match_score: number | null
          skills_match_score: number | null
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          applied_through_platform?: boolean | null
          bookmarked_at?: string | null
          clicked_at?: string | null
          created_at?: string | null
          experience_match_score?: number | null
          id?: string
          job_id: string
          location_match_score?: number | null
          match_reasons?: string[] | null
          overall_score?: number | null
          recommendation_confidence?: number | null
          salary_match_score?: number | null
          skills_match_score?: number | null
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          applied_through_platform?: boolean | null
          bookmarked_at?: string | null
          clicked_at?: string | null
          created_at?: string | null
          experience_match_score?: number | null
          id?: string
          job_id?: string
          location_match_score?: number | null
          match_reasons?: string[] | null
          overall_score?: number | null
          recommendation_confidence?: number | null
          salary_match_score?: number | null
          skills_match_score?: number | null
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_match_scores_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_scraping_logs: {
        Row: {
          errors: string[] | null
          id: string
          jobs_found: number | null
          jobs_inserted: number | null
          jobs_marked_duplicate: number | null
          jobs_updated: number | null
          metadata: Json | null
          scrape_completed_at: string | null
          scrape_started_at: string | null
          source_id: string | null
          status: string | null
        }
        Insert: {
          errors?: string[] | null
          id?: string
          jobs_found?: number | null
          jobs_inserted?: number | null
          jobs_marked_duplicate?: number | null
          jobs_updated?: number | null
          metadata?: Json | null
          scrape_completed_at?: string | null
          scrape_started_at?: string | null
          source_id?: string | null
          status?: string | null
        }
        Update: {
          errors?: string[] | null
          id?: string
          jobs_found?: number | null
          jobs_inserted?: number | null
          jobs_marked_duplicate?: number | null
          jobs_updated?: number | null
          metadata?: Json | null
          scrape_completed_at?: string | null
          scrape_started_at?: string | null
          source_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_scraping_logs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "job_scraping_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      job_scraping_queue: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          experience_filter:
            | Database["public"]["Enums"]["experience_level"]
            | null
          id: string
          job_type_filter: Database["public"]["Enums"]["job_type"] | null
          jobs_found: number | null
          jobs_inserted: number | null
          location_filter: string | null
          max_retries: number | null
          priority: number | null
          retry_count: number | null
          scheduled_for: string | null
          search_query: string
          source_id: string
          started_at: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          experience_filter?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          id?: string
          job_type_filter?: Database["public"]["Enums"]["job_type"] | null
          jobs_found?: number | null
          jobs_inserted?: number | null
          location_filter?: string | null
          max_retries?: number | null
          priority?: number | null
          retry_count?: number | null
          scheduled_for?: string | null
          search_query: string
          source_id: string
          started_at?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          experience_filter?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          id?: string
          job_type_filter?: Database["public"]["Enums"]["job_type"] | null
          jobs_found?: number | null
          jobs_inserted?: number | null
          location_filter?: string | null
          max_retries?: number | null
          priority?: number | null
          retry_count?: number | null
          scheduled_for?: string | null
          search_query?: string
          source_id?: string
          started_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_scraping_queue_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "job_scraping_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      job_scraping_sources: {
        Row: {
          api_endpoint: string | null
          api_key_required: boolean | null
          auth_type: string | null
          base_url: string
          created_at: string | null
          errors_count: number | null
          id: string
          job_types_supported: string[] | null
          last_error: string | null
          last_scrape_at: string | null
          name: string
          next_scrape_at: string | null
          rate_limit_per_hour: number | null
          rate_limit_requests_per_minute: number | null
          scrape_interval_minutes: number | null
          scraping_enabled: boolean | null
          supported_countries: string[] | null
          total_jobs_scraped: number | null
          updated_at: string | null
        }
        Insert: {
          api_endpoint?: string | null
          api_key_required?: boolean | null
          auth_type?: string | null
          base_url: string
          created_at?: string | null
          errors_count?: number | null
          id?: string
          job_types_supported?: string[] | null
          last_error?: string | null
          last_scrape_at?: string | null
          name: string
          next_scrape_at?: string | null
          rate_limit_per_hour?: number | null
          rate_limit_requests_per_minute?: number | null
          scrape_interval_minutes?: number | null
          scraping_enabled?: boolean | null
          supported_countries?: string[] | null
          total_jobs_scraped?: number | null
          updated_at?: string | null
        }
        Update: {
          api_endpoint?: string | null
          api_key_required?: boolean | null
          auth_type?: string | null
          base_url?: string
          created_at?: string | null
          errors_count?: number | null
          id?: string
          job_types_supported?: string[] | null
          last_error?: string | null
          last_scrape_at?: string | null
          name?: string
          next_scrape_at?: string | null
          rate_limit_per_hour?: number | null
          rate_limit_requests_per_minute?: number | null
          scrape_interval_minutes?: number | null
          scraping_enabled?: boolean | null
          supported_countries?: string[] | null
          total_jobs_scraped?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      job_searches: {
        Row: {
          created_at: string
          filters: Json | null
          id: string
          results_count: number | null
          search_query: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          filters?: Json | null
          id?: string
          results_count?: number | null
          search_query: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          filters?: Json | null
          id?: string
          results_count?: number | null
          search_query?: string
          user_id?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          application_deadline: string | null
          application_deadline_verified: boolean | null
          application_methods: Json | null
          application_url: string
          benefits: string[] | null
          city: string | null
          company: string
          company_culture: string[] | null
          company_description: string | null
          company_employees_count: number | null
          company_founded: string | null
          company_logo: string | null
          company_size: string | null
          company_website: string | null
          contact_email: string | null
          contact_phone: string | null
          cost_of_living: string | null
          country: string | null
          created_at: string
          description: string
          duplicate_confidence_score: number | null
          duplicate_of: string | null
          education_requirements: string[] | null
          experience_level: string
          expires_date: string | null
          external_id: string | null
          id: string
          industry: string | null
          is_duplicate: boolean | null
          is_featured: boolean | null
          is_remote: boolean | null
          job_board: string | null
          job_function: string | null
          job_level: string | null
          job_type: string
          last_scraped_at: string | null
          latitude: number | null
          location: string
          longitude: number | null
          posted_date: string
          quality_score: number | null
          relevance_score: number | null
          requirements: string[] | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          salary_period: string | null
          salary_verified: boolean | null
          security_clearance_required: boolean | null
          semantic_hash: string | null
          seniority_level: string | null
          skills_preferred: string[] | null
          skills_required: string[] | null
          source_job_id: string | null
          source_platform: string | null
          source_url: string | null
          tags: string[] | null
          timezone: string | null
          title: string
          updated_at: string
          vendor_urls: Json | null
          visa_sponsorship: boolean | null
          visa_sponsorship_details: Json | null
          work_authorization: string[] | null
          years_experience_max: number | null
          years_experience_min: number | null
        }
        Insert: {
          application_deadline?: string | null
          application_deadline_verified?: boolean | null
          application_methods?: Json | null
          application_url: string
          benefits?: string[] | null
          city?: string | null
          company: string
          company_culture?: string[] | null
          company_description?: string | null
          company_employees_count?: number | null
          company_founded?: string | null
          company_logo?: string | null
          company_size?: string | null
          company_website?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          cost_of_living?: string | null
          country?: string | null
          created_at?: string
          description: string
          duplicate_confidence_score?: number | null
          duplicate_of?: string | null
          education_requirements?: string[] | null
          experience_level: string
          expires_date?: string | null
          external_id?: string | null
          id?: string
          industry?: string | null
          is_duplicate?: boolean | null
          is_featured?: boolean | null
          is_remote?: boolean | null
          job_board?: string | null
          job_function?: string | null
          job_level?: string | null
          job_type: string
          last_scraped_at?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          posted_date: string
          quality_score?: number | null
          relevance_score?: number | null
          requirements?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_period?: string | null
          salary_verified?: boolean | null
          security_clearance_required?: boolean | null
          semantic_hash?: string | null
          seniority_level?: string | null
          skills_preferred?: string[] | null
          skills_required?: string[] | null
          source_job_id?: string | null
          source_platform?: string | null
          source_url?: string | null
          tags?: string[] | null
          timezone?: string | null
          title: string
          updated_at?: string
          vendor_urls?: Json | null
          visa_sponsorship?: boolean | null
          visa_sponsorship_details?: Json | null
          work_authorization?: string[] | null
          years_experience_max?: number | null
          years_experience_min?: number | null
        }
        Update: {
          application_deadline?: string | null
          application_deadline_verified?: boolean | null
          application_methods?: Json | null
          application_url?: string
          benefits?: string[] | null
          city?: string | null
          company?: string
          company_culture?: string[] | null
          company_description?: string | null
          company_employees_count?: number | null
          company_founded?: string | null
          company_logo?: string | null
          company_size?: string | null
          company_website?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          cost_of_living?: string | null
          country?: string | null
          created_at?: string
          description?: string
          duplicate_confidence_score?: number | null
          duplicate_of?: string | null
          education_requirements?: string[] | null
          experience_level?: string
          expires_date?: string | null
          external_id?: string | null
          id?: string
          industry?: string | null
          is_duplicate?: boolean | null
          is_featured?: boolean | null
          is_remote?: boolean | null
          job_board?: string | null
          job_function?: string | null
          job_level?: string | null
          job_type?: string
          last_scraped_at?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          posted_date?: string
          quality_score?: number | null
          relevance_score?: number | null
          requirements?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_period?: string | null
          salary_verified?: boolean | null
          security_clearance_required?: boolean | null
          semantic_hash?: string | null
          seniority_level?: string | null
          skills_preferred?: string[] | null
          skills_required?: string[] | null
          source_job_id?: string | null
          source_platform?: string | null
          source_url?: string | null
          tags?: string[] | null
          timezone?: string | null
          title?: string
          updated_at?: string
          vendor_urls?: Json | null
          visa_sponsorship?: boolean | null
          visa_sponsorship_details?: Json | null
          work_authorization?: string[] | null
          years_experience_max?: number | null
          years_experience_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_duplicate_of_fkey"
            columns: ["duplicate_of"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          enrollment_id: string | null
          id: string
          last_accessed_at: string | null
          lesson_id: string | null
          time_spent_minutes: number | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          enrollment_id?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id?: string | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          enrollment_id?: string | null
          id?: string
          last_accessed_at?: string | null
          lesson_id?: string | null
          time_spent_minutes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          is_free_preview: boolean | null
          lesson_order: number
          lesson_type: string | null
          module_id: string | null
          resources: Json | null
          title: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          lesson_order: number
          lesson_type?: string | null
          module_id?: string | null
          resources?: Json | null
          title: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          lesson_order?: number
          lesson_type?: string | null
          module_id?: string | null
          resources?: Json | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorship_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          meeting_url: string | null
          mentorship_id: string | null
          notes: string | null
          scheduled_at: string
          session_type: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_url?: string | null
          mentorship_id?: string | null
          notes?: string | null
          scheduled_at: string
          session_type?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_url?: string | null
          mentorship_id?: string | null
          notes?: string | null
          scheduled_at?: string
          session_type?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentorship_sessions_mentorship_id_fkey"
            columns: ["mentorship_id"]
            isOneToOne: false
            referencedRelation: "mentorships"
            referencedColumns: ["id"]
          },
        ]
      }
      mentorships: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          mentee_id: string | null
          mentor_id: string | null
          next_session_at: string | null
          notes: string | null
          session_count: number | null
          status: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          mentee_id?: string | null
          mentor_id?: string | null
          next_session_at?: string | null
          notes?: string | null
          session_count?: number | null
          status?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          mentee_id?: string | null
          mentor_id?: string | null
          next_session_at?: string | null
          notes?: string | null
          session_count?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentorships_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          course_id: number
          created_at: string
          currency: string | null
          id: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          course_id: number
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          course_id?: number
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      phone_verifications: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          otp_code: string
          phone: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          otp_code: string
          phone: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          otp_code?: string
          phone?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      process_flows: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          flow_data: Json
          flow_type: string
          id: string
          name: string
          related_screens: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          flow_data: Json
          flow_type: string
          id?: string
          name: string
          related_screens?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          flow_data?: Json
          flow_type?: string
          id?: string
          name?: string
          related_screens?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "process_flows_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_provider: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          email_verification_token: string | null
          email_verified: boolean | null
          email_verified_at: string | null
          experience_level: string | null
          first_name: string | null
          full_name: string | null
          id: string
          interests: string[] | null
          is_active: boolean | null
          last_activity_at: string | null
          last_login_at: string | null
          last_name: string | null
          learning_goals: string[] | null
          login_count: number | null
          onboarding_step: Database["public"]["Enums"]["onboarding_step"] | null
          phone: string | null
          phone_verified: boolean | null
          preferred_theme: string | null
          privacy_accepted_at: string | null
          provider_id: string | null
          referral_code: string | null
          referred_by_code: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          terms_accepted_at: string | null
          updated_at: string | null
        }
        Insert: {
          auth_provider?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          email_verification_token?: string | null
          email_verified?: boolean | null
          email_verified_at?: string | null
          experience_level?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          interests?: string[] | null
          is_active?: boolean | null
          last_activity_at?: string | null
          last_login_at?: string | null
          last_name?: string | null
          learning_goals?: string[] | null
          login_count?: number | null
          onboarding_step?:
            | Database["public"]["Enums"]["onboarding_step"]
            | null
          phone?: string | null
          phone_verified?: boolean | null
          preferred_theme?: string | null
          privacy_accepted_at?: string | null
          provider_id?: string | null
          referral_code?: string | null
          referred_by_code?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          terms_accepted_at?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_provider?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          email_verification_token?: string | null
          email_verified?: boolean | null
          email_verified_at?: string | null
          experience_level?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          interests?: string[] | null
          is_active?: boolean | null
          last_activity_at?: string | null
          last_login_at?: string | null
          last_name?: string | null
          learning_goals?: string[] | null
          login_count?: number | null
          onboarding_step?:
            | Database["public"]["Enums"]["onboarding_step"]
            | null
          phone?: string | null
          phone_verified?: boolean | null
          preferred_theme?: string | null
          privacy_accepted_at?: string | null
          provider_id?: string | null
          referral_code?: string | null
          referred_by_code?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          terms_accepted_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quiz_sessions: {
        Row: {
          answers: Json | null
          auto_saved_at: string | null
          current_question: number | null
          id: string
          is_active: boolean | null
          quiz_id: number
          started_at: string | null
          time_remaining: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          auto_saved_at?: string | null
          current_question?: number | null
          id?: string
          is_active?: boolean | null
          quiz_id: number
          started_at?: string | null
          time_remaining?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          auto_saved_at?: string | null
          current_question?: number | null
          id?: string
          is_active?: boolean | null
          quiz_id?: number
          started_at?: string | null
          time_remaining?: number | null
          user_id?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action: string
          count: number | null
          created_at: string | null
          id: string
          user_id: string
          window_start: string | null
        }
        Insert: {
          action: string
          count?: number | null
          created_at?: string | null
          id?: string
          user_id: string
          window_start?: string | null
        }
        Update: {
          action?: string
          count?: number | null
          created_at?: string | null
          id?: string
          user_id?: string
          window_start?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          user_id: string
          uses_count: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          user_id: string
          uses_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          user_id?: string
          uses_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      screen_flows: {
        Row: {
          access_requirements: Json | null
          component_name: string | null
          created_at: string | null
          flow_sequence: number | null
          id: string
          navigation_rules: Json | null
          route_path: string
          screen_name: string
          updated_at: string | null
        }
        Insert: {
          access_requirements?: Json | null
          component_name?: string | null
          created_at?: string | null
          flow_sequence?: number | null
          id?: string
          navigation_rules?: Json | null
          route_path: string
          screen_name: string
          updated_at?: string | null
        }
        Update: {
          access_requirements?: Json | null
          component_name?: string | null
          created_at?: string | null
          flow_sequence?: number | null
          id?: string
          navigation_rules?: Json | null
          route_path?: string
          screen_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      security_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          risk_level: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          risk_level?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          risk_level?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      study_group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          assessment_id: number
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          max_members: number | null
          name: string
        }
        Insert: {
          assessment_id: number
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          max_members?: number | null
          name: string
        }
        Update: {
          assessment_id?: number
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          max_members?: number | null
          name?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          assessments_completed: number | null
          average_score: number | null
          created_at: string | null
          date: string
          id: string
          time_studied: number | null
          topics_studied: string[] | null
          user_id: string
        }
        Insert: {
          assessments_completed?: number | null
          average_score?: number | null
          created_at?: string | null
          date: string
          id?: string
          time_studied?: number | null
          topics_studied?: string[] | null
          user_id: string
        }
        Update: {
          assessments_completed?: number | null
          average_score?: number | null
          created_at?: string | null
          date?: string
          id?: string
          time_studied?: number | null
          topics_studied?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      user_assessments: {
        Row: {
          answers: Json | null
          assessment_id: number
          attempts: number | null
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          score: number | null
          started_at: string | null
          time_spent: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          assessment_id: number
          attempts?: number | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          time_spent?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          assessment_id?: number
          attempts?: number | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          time_spent?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_career_profiles: {
        Row: {
          created_at: string | null
          current_title: string | null
          email: string | null
          experience_level:
            | Database["public"]["Enums"]["experience_level"]
            | null
          first_name: string | null
          id: string
          industry: string | null
          last_name: string | null
          last_updated_at: string | null
          location: string | null
          phone: string | null
          preferred_job_types: Database["public"]["Enums"]["job_type"][] | null
          preferred_locations: string[] | null
          profile_completion_score: number | null
          remote_work_preference: string | null
          skills: string[] | null
          target_salary_max: number | null
          target_salary_min: number | null
          user_id: string
          willing_to_relocate: boolean | null
        }
        Insert: {
          created_at?: string | null
          current_title?: string | null
          email?: string | null
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          first_name?: string | null
          id?: string
          industry?: string | null
          last_name?: string | null
          last_updated_at?: string | null
          location?: string | null
          phone?: string | null
          preferred_job_types?: Database["public"]["Enums"]["job_type"][] | null
          preferred_locations?: string[] | null
          profile_completion_score?: number | null
          remote_work_preference?: string | null
          skills?: string[] | null
          target_salary_max?: number | null
          target_salary_min?: number | null
          user_id: string
          willing_to_relocate?: boolean | null
        }
        Update: {
          created_at?: string | null
          current_title?: string | null
          email?: string | null
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          first_name?: string | null
          id?: string
          industry?: string | null
          last_name?: string | null
          last_updated_at?: string | null
          location?: string | null
          phone?: string | null
          preferred_job_types?: Database["public"]["Enums"]["job_type"][] | null
          preferred_locations?: string[] | null
          profile_completion_score?: number | null
          remote_work_preference?: string | null
          skills?: string[] | null
          target_salary_max?: number | null
          target_salary_min?: number | null
          user_id?: string
          willing_to_relocate?: boolean | null
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          created_at: string
          document_type: string
          extracted_text: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          is_primary: boolean | null
          metadata: Json | null
          mime_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          extracted_text?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          is_primary?: boolean | null
          metadata?: Json | null
          mime_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          extracted_text?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          is_primary?: boolean | null
          metadata?: Json | null
          mime_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_education: {
        Row: {
          created_at: string
          degree: string | null
          end_date: string | null
          field_of_study: string | null
          gpa: string | null
          honors: string[] | null
          id: string
          institution: string
          relevant_coursework: string[] | null
          start_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          degree?: string | null
          end_date?: string | null
          field_of_study?: string | null
          gpa?: string | null
          honors?: string[] | null
          id?: string
          institution: string
          relevant_coursework?: string[] | null
          start_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          degree?: string | null
          end_date?: string | null
          field_of_study?: string | null
          gpa?: string | null
          honors?: string[] | null
          id?: string
          institution?: string
          relevant_coursework?: string[] | null
          start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_experiences: {
        Row: {
          achievements: string[] | null
          company: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          position: string
          skills_used: string[] | null
          start_date: string | null
          user_id: string
        }
        Insert: {
          achievements?: string[] | null
          company: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position: string
          skills_used?: string[] | null
          start_date?: string | null
          user_id: string
        }
        Update: {
          achievements?: string[] | null
          company?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position?: string
          skills_used?: string[] | null
          start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_generated_templates: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          template_data: Json
          template_type: string
          template_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          template_data: Json
          template_type: string
          template_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          template_data?: Json
          template_type?: string
          template_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_job_preferences: {
        Row: {
          ai_matching_enabled: boolean | null
          company_size_preference: string[] | null
          created_at: string | null
          excluded_companies: string[] | null
          excluded_keywords: string[] | null
          id: string
          keywords: string[] | null
          matching_aggressiveness: number | null
          max_commute_minutes: number | null
          min_salary: number | null
          notification_frequency: string | null
          preferred_companies: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_matching_enabled?: boolean | null
          company_size_preference?: string[] | null
          created_at?: string | null
          excluded_companies?: string[] | null
          excluded_keywords?: string[] | null
          id?: string
          keywords?: string[] | null
          matching_aggressiveness?: number | null
          max_commute_minutes?: number | null
          min_salary?: number | null
          notification_frequency?: string | null
          preferred_companies?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_matching_enabled?: boolean | null
          company_size_preference?: string[] | null
          created_at?: string | null
          excluded_companies?: string[] | null
          excluded_keywords?: string[] | null
          id?: string
          keywords?: string[] | null
          matching_aggressiveness?: number | null
          max_commute_minutes?: number | null
          min_salary?: number | null
          notification_frequency?: string | null
          preferred_companies?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          achievements: string[] | null
          address: string | null
          available_from: string | null
          certifications: string[] | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          current_title: string | null
          date_of_birth: string | null
          email: string | null
          experience_level: string | null
          extracted_education: Json | null
          extracted_experience: Json | null
          extracted_skills: string[] | null
          facebook_url: string | null
          first_name: string | null
          github_url: string | null
          id: string
          industry: string | null
          instagram_url: string | null
          is_profile_verified: boolean | null
          languages: string[] | null
          last_name: string | null
          linkedin_url: string | null
          location: string | null
          personal_bio: string | null
          personal_website: string | null
          phone: string | null
          portfolio_url: string | null
          postal_code: string | null
          professional_summary: string | null
          profile_completion_percentage: number | null
          resume_parsed_data: Json | null
          salary_expectation: string | null
          skills: string[] | null
          state: string | null
          target_roles: string[] | null
          twitter_url: string | null
          updated_at: string
          user_id: string
          willing_to_relocate: boolean | null
          work_preference: string | null
        }
        Insert: {
          achievements?: string[] | null
          address?: string | null
          available_from?: string | null
          certifications?: string[] | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          current_title?: string | null
          date_of_birth?: string | null
          email?: string | null
          experience_level?: string | null
          extracted_education?: Json | null
          extracted_experience?: Json | null
          extracted_skills?: string[] | null
          facebook_url?: string | null
          first_name?: string | null
          github_url?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          is_profile_verified?: boolean | null
          languages?: string[] | null
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          personal_bio?: string | null
          personal_website?: string | null
          phone?: string | null
          portfolio_url?: string | null
          postal_code?: string | null
          professional_summary?: string | null
          profile_completion_percentage?: number | null
          resume_parsed_data?: Json | null
          salary_expectation?: string | null
          skills?: string[] | null
          state?: string | null
          target_roles?: string[] | null
          twitter_url?: string | null
          updated_at?: string
          user_id: string
          willing_to_relocate?: boolean | null
          work_preference?: string | null
        }
        Update: {
          achievements?: string[] | null
          address?: string | null
          available_from?: string | null
          certifications?: string[] | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          current_title?: string | null
          date_of_birth?: string | null
          email?: string | null
          experience_level?: string | null
          extracted_education?: Json | null
          extracted_experience?: Json | null
          extracted_skills?: string[] | null
          facebook_url?: string | null
          first_name?: string | null
          github_url?: string | null
          id?: string
          industry?: string | null
          instagram_url?: string | null
          is_profile_verified?: boolean | null
          languages?: string[] | null
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          personal_bio?: string | null
          personal_website?: string | null
          phone?: string | null
          portfolio_url?: string | null
          postal_code?: string | null
          professional_summary?: string | null
          profile_completion_percentage?: number | null
          resume_parsed_data?: Json | null
          salary_expectation?: string | null
          skills?: string[] | null
          state?: string | null
          target_roles?: string[] | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string
          willing_to_relocate?: boolean | null
          work_preference?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          id: string
          ip_address: unknown | null
          last_active: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          ip_address?: unknown | null
          last_active?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          id?: string
          ip_address?: unknown | null
          last_active?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_job_quality_score: {
        Args: {
          job_title: string
          job_description: string
          company_name: string
          salary_min: number
          salary_max: number
          requirements: string[]
          benefits: string[]
        }
        Returns: number
      }
      check_admin_role: {
        Args: {
          user_uuid: string
          required_role: Database["public"]["Enums"]["admin_role"]
        }
        Returns: boolean
      }
      check_auth_rate_limit: {
        Args: {
          p_ip_address: unknown
          p_attempt_type: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      check_rate_limit: {
        Args: {
          p_user_id: string
          p_action: string
          p_limit?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_verification_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          p_admin_user_id: string
          p_action: string
          p_resource_type: string
          p_resource_id?: string
          p_details?: Json
          p_ip_address?: unknown
          p_user_agent?: string
        }
        Returns: string
      }
      log_security_event: {
        Args: {
          p_user_id: string
          p_action: string
          p_resource_type?: string
          p_resource_id?: string
          p_ip_address?: unknown
          p_user_agent?: string
          p_metadata?: Json
          p_risk_level?: string
        }
        Returns: string
      }
      track_user_login: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      update_user_analytics: {
        Args: {
          p_user_id: string
          p_time_studied?: number
          p_assessment_completed?: boolean
          p_score?: number
          p_topics?: string[]
        }
        Returns: undefined
      }
      user_can_access_assessment: {
        Args: { assessment_id: number; user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      admin_role: "super_admin" | "admin" | "moderator" | "employee"
      application_status:
        | "applied"
        | "viewed"
        | "interviewing"
        | "offered"
        | "rejected"
        | "withdrawn"
      experience_level: "entry" | "mid" | "senior" | "lead" | "executive"
      job_type: "full-time" | "part-time" | "contract" | "remote" | "hybrid"
      onboarding_step: "profile_setup" | "preferences" | "goals" | "completed"
      user_role: "student" | "instructor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["super_admin", "admin", "moderator", "employee"],
      application_status: [
        "applied",
        "viewed",
        "interviewing",
        "offered",
        "rejected",
        "withdrawn",
      ],
      experience_level: ["entry", "mid", "senior", "lead", "executive"],
      job_type: ["full-time", "part-time", "contract", "remote", "hybrid"],
      onboarding_step: ["profile_setup", "preferences", "goals", "completed"],
      user_role: ["student", "instructor", "admin"],
    },
  },
} as const
