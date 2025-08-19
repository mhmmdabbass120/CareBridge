export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      allergies: {
        Row: {
          created_at: string | null
          id: string
          patient_id: string
          reaction: string | null
          severity: string | null
          substance: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          patient_id: string
          reaction?: string | null
          severity?: string | null
          substance: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          patient_id?: string
          reaction?: string | null
          severity?: string | null
          substance?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "allergies_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          created_at: string | null
          end_time: string
          id: string
          notes: string | null
          patient_id: string
          provider_id: string
          start_time: string
          status: Database["public"]["Enums"]["appointment_status"]
          type: Database["public"]["Enums"]["appointment_type"]
          updated_at: string | null
          video_room_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time: string
          id?: string
          notes?: string | null
          patient_id: string
          provider_id: string
          start_time: string
          status?: Database["public"]["Enums"]["appointment_status"]
          type?: Database["public"]["Enums"]["appointment_type"]
          updated_at?: string | null
          video_room_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          patient_id?: string
          provider_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          type?: Database["public"]["Enums"]["appointment_type"]
          updated_at?: string | null
          video_room_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_plans: {
        Row: {
          completed_at: string | null
          created_at: string | null
          goals: Json | null
          id: string
          owner_id: string
          patient_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["care_plan_status"]
          title: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          goals?: Json | null
          id?: string
          owner_id: string
          patient_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["care_plan_status"]
          title: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          goals?: Json | null
          id?: string
          owner_id?: string
          patient_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["care_plan_status"]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "care_plans_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_plans_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          created_at: string | null
          expires_at: string | null
          granted_at: string | null
          id: string
          patient_id: string
          revoked_at: string | null
          scopes: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          granted_at?: string | null
          id?: string
          patient_id: string
          revoked_at?: string | null
          scopes: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          granted_at?: string | null
          id?: string
          patient_id?: string
          revoked_at?: string | null
          scopes?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          file_size: number | null
          file_url: string
          id: string
          kind: string
          metadata: Json | null
          mime_type: string | null
          patient_id: string
          title: string
          updated_at: string | null
          uploaded_by_id: string
        }
        Insert: {
          created_at?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          kind: string
          metadata?: Json | null
          mime_type?: string | null
          patient_id: string
          title: string
          updated_at?: string | null
          uploaded_by_id: string
        }
        Update: {
          created_at?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          kind?: string
          metadata?: Json | null
          mime_type?: string | null
          patient_id?: string
          title?: string
          updated_at?: string | null
          uploaded_by_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_id_fkey"
            columns: ["uploaded_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string | null
          dose: string | null
          ended_at: string | null
          frequency: string | null
          id: string
          name: string
          patient_id: string
          route: string | null
          started_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dose?: string | null
          ended_at?: string | null
          frequency?: string | null
          id?: string
          name: string
          patient_id: string
          route?: string | null
          started_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dose?: string | null
          ended_at?: string | null
          frequency?: string | null
          id?: string
          name?: string
          patient_id?: string
          route?: string | null
          started_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medications_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_threads: {
        Row: {
          created_at: string | null
          id: string
          is_internal: boolean | null
          participants: Json
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          participants: Json
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          participants?: Json
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachments: Json | null
          content: string
          created_at: string | null
          id: string
          sender_id: string
          thread_id: string
        }
        Insert: {
          attachments?: Json | null
          content: string
          created_at?: string | null
          id?: string
          sender_id: string
          thread_id: string
        }
        Update: {
          attachments?: Json | null
          content?: string
          created_at?: string | null
          id?: string
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      observations: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          patient_id: string
          recorded_by_id: string
          taken_at: string
          type: string
          unit: string | null
          updated_at: string | null
          value_number: number | null
          value_text: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          recorded_by_id: string
          taken_at: string
          type: string
          unit?: string | null
          updated_at?: string | null
          value_number?: number | null
          value_text?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          recorded_by_id?: string
          taken_at?: string
          type?: string
          unit?: string | null
          updated_at?: string | null
          value_number?: number | null
          value_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "observations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "observations_recorded_by_id_fkey"
            columns: ["recorded_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_profiles: {
        Row: {
          address: Json | null
          created_at: string | null
          date_of_birth: string | null
          emergency_contacts: Json | null
          id: string
          phone: string | null
          preferred_language: string | null
          profile_id: string
          sex: string | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contacts?: Json | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          profile_id: string
          sex?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contacts?: Json | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          profile_id?: string
          sex?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          language: string | null
          mfa_enabled: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          language?: string | null
          mfa_enabled?: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          language?: string | null
          mfa_enabled?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      provider_profiles: {
        Row: {
          clinic_location: string | null
          created_at: string | null
          id: string
          license_number: string | null
          profile_id: string
          specialty: string | null
          updated_at: string | null
        }
        Insert: {
          clinic_location?: string | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          profile_id: string
          specialty?: string | null
          updated_at?: string | null
        }
        Update: {
          clinic_location?: string | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          profile_id?: string
          specialty?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: string
          care_plan_id: string
          completed_at: string | null
          created_at: string | null
          due_at: string | null
          id: string
          instructions: string | null
          recurrence_rule: string | null
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string | null
        }
        Insert: {
          assignee_id: string
          care_plan_id: string
          completed_at?: string | null
          created_at?: string | null
          due_at?: string | null
          id?: string
          instructions?: string | null
          recurrence_rule?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string | null
        }
        Update: {
          assignee_id?: string
          care_plan_id?: string
          completed_at?: string | null
          created_at?: string | null
          due_at?: string | null
          id?: string
          instructions?: string | null
          recurrence_rule?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_care_plan_id_fkey"
            columns: ["care_plan_id"]
            isOneToOne: false
            referencedRelation: "care_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      appointment_status: "pending" | "confirmed" | "completed" | "cancelled"
      appointment_type: "clinic" | "video"
      care_plan_status: "active" | "completed"
      task_status: "pending" | "done" | "missed"
      user_role: "patient" | "doctor" | "nurse" | "caregiver" | "admin"
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
      appointment_status: ["pending", "confirmed", "completed", "cancelled"],
      appointment_type: ["clinic", "video"],
      care_plan_status: ["active", "completed"],
      task_status: ["pending", "done", "missed"],
      user_role: ["patient", "doctor", "nurse", "caregiver", "admin"],
    },
  },
} as const
